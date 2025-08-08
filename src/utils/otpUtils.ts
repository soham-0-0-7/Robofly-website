import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in Redis with 10 minutes expiry
export async function storeOTP(email: string, otp: string): Promise<void> {
  const key = `otp:${email}`;
  await redis.setex(key, 600, otp); // 10 minutes expiry
}

// Verify OTP
export async function verifyOTP(
  email: string,
  providedOTP: string
): Promise<boolean> {
  const key = `otp:${email}`;
  const storedOTP = await redis.get(key);

  if (storedOTP == providedOTP) {
    // Delete OTP after successful verification
    await redis.del(key);
    return true;
  }

  return false;
}

// Rate limiting for email and IP
export async function checkRateLimit(
  identifier: string,
  limit: number = 5
): Promise<boolean> {
  const key = `rate_limit:${identifier}`;
  const current = await redis.get(key);

  if (!current) {
    await redis.setex(key, 3600, 1); // 1 hour window
    return true;
  }

  const count = parseInt(current as string);
  if (count >= limit) {
    return false;
  }

  await redis.incr(key);
  return true;
}

// Get remaining attempts
export async function getRemainingAttempts(
  identifier: string,
  limit: number = 5
): Promise<number> {
  const key = `rate_limit:${identifier}`;
  const current = await redis.get(key);

  if (!current) return limit;

  const used = parseInt(current as string);
  return Math.max(0, limit - used);
}
