import { NextResponse } from "next/server";
import {
  generateOTP,
  storeOTP,
  checkRateLimit,
  getRemainingAttempts,
} from "@/utils/otpUtils";
import { sendOTPEmail, sendLoginOTPEmail } from "@/utils/emailService"; // Add sendLoginOTPEmail

export async function POST(request: Request) {
  try {
    const { email, name, purpose = "general" } = await request.json(); // Add purpose parameter

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    // Check rate limits
    const emailRateCheck = await checkRateLimit(`email:${email}`, 5);
    const ipRateCheck = await checkRateLimit(`ip:${ip}`, 20);

    if (!emailRateCheck) {
      const remaining = await getRemainingAttempts(`email:${email}`, 5);
      return NextResponse.json(
        {
          error: `Too many attempts. Try again later. Remaining attempts: ${remaining}`,
        },
        { status: 429 }
      );
    }

    if (!ipRateCheck) {
      const remaining = await getRemainingAttempts(`ip:${ip}`, 5);
      return NextResponse.json(
        {
          error: `Too many attempts. Try again later. Remaining attempts: ${remaining}`,
        },
        { status: 429 }
      );
    }

    // Generate and store OTP
    const otp = generateOTP();
    await storeOTP(email, otp);

    // Send email based on purpose
    let emailSent = false;
    if (purpose === "login") {
      emailSent = await sendLoginOTPEmail(email, otp, name);
    } else {
      emailSent = await sendOTPEmail(email, otp, name);
    }

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
