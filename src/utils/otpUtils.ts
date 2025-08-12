import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Generate a 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in Redis with 10-minute expiration
export async function storeOTP(email: string, otp: string): Promise<void> {
  const key = `otp:${email}`;
  await redis.setex(key, 600, otp); // 10 minutes
}

// Verify OTP
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const key = `otp:${email}`;
  const storedOTP = await redis.get(key);
  
  if (storedOTP === otp) {
    // Delete the OTP after successful verification
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

// Login-specific rate limiting functions
export async function checkLoginRateLimit(
  identifier: string, // username, email, or IP
  limit: number = 5,
  windowInSeconds: number = 900 // 15 minutes
): Promise<{ allowed: boolean; remainingAttempts: number; resetTime?: number }> {
  const key = `login_rate:${identifier}`;
  const current = await redis.get(key);

  if (!current) {
    await redis.setex(key, windowInSeconds, 1);
    return { 
      allowed: true, 
      remainingAttempts: limit - 1 
    };
  }

  const count = parseInt(current as string);
  if (count >= limit) {
    const ttl = await redis.ttl(key);
    return { 
      allowed: false, 
      remainingAttempts: 0,
      resetTime: Date.now() + (ttl * 1000)
    };
  }

  await redis.incr(key);
  return { 
    allowed: true, 
    remainingAttempts: limit - count - 1 
  };
}

// Record failed login attempt
export async function recordFailedLogin(
  identifier: string,
  windowInSeconds: number = 900 // 15 minutes
): Promise<void> {
  const key = `login_rate:${identifier}`;
  const current = await redis.get(key);

  if (!current) {
    await redis.setex(key, windowInSeconds, 1);
  } else {
    await redis.incr(key);
  }
}

// Clear login rate limit (on successful login)
export async function clearLoginRateLimit(identifier: string): Promise<void> {
  const key = `login_rate:${identifier}`;
  await redis.del(key);
}

// Get time until reset
export async function getLoginRateLimitInfo(
  identifier: string
): Promise<{ attempts: number; resetTime?: number }> {
  const key = `login_rate:${identifier}`;
  const current = await redis.get(key);
  
  if (!current) {
    return { attempts: 0 };
  }

  const attempts = parseInt(current as string);
  const ttl = await redis.ttl(key);
  const resetTime = ttl > 0 ? Date.now() + (ttl * 1000) : undefined;

  return { attempts, resetTime };
}

// Progressive delay for repeated failures
export function calculateLoginDelay(attempts: number): number {
  if (attempts <= 3) return 0;
  if (attempts <= 5) return 5000; // 5 seconds
  if (attempts <= 7) return 30000; // 30 seconds
  if (attempts <= 10) return 60000; // 1 minute
  return 300000; // 5 minutes
}