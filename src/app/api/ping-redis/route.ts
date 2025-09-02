/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    await redis.ping();
    return new Response(
      JSON.stringify({ message: "Redis pinged successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to ping Redis" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
