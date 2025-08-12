import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/utils/crypto";
import { 
  checkLoginRateLimit, 
  recordFailedLogin, 
  clearLoginRateLimit,
  getLoginRateLimitInfo,
  calculateLoginDelay
} from "@/utils/otpUtils";

// Helper function to get client IP
function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const remoteAddr = request.headers.get("remote-addr");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP.trim();
  }
  if (remoteAddr) {
    return remoteAddr.trim();
  }
  
  return "unknown";
}

export async function POST(request: Request) {
  console.log("Login attempt started");

  const clientIP = getClientIP(request);
  let identifier = "";
  
  try {
    await dbConnect();
    console.log("Database connected successfully");

    const requestData = await request.json();
    const { identifier: loginIdentifier, password, skipSession = false } = requestData;
    identifier = loginIdentifier;

    console.log(`Login attempt for identifier: ${identifier} from IP: ${clientIP}`);

    // Check rate limits for both identifier and IP
    const identifierRateCheck = await checkLoginRateLimit(`user:${identifier}`, 5, 900); // 5 attempts per 15 minutes
    const ipRateCheck = await checkLoginRateLimit(`ip:${clientIP}`, 20, 3600); // 20 attempts per hour

    // Check if identifier is rate limited
    if (!identifierRateCheck.allowed) {
      const resetTime = identifierRateCheck.resetTime ? new Date(identifierRateCheck.resetTime) : new Date();
      const minutesRemaining = Math.ceil((resetTime.getTime() - Date.now()) / 60000);
      
      console.log(`Rate limit exceeded for identifier: ${identifier}`);
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Try again in ${minutesRemaining} minute(s).`,
          rateLimited: true,
          resetTime: resetTime.toISOString(),
          remainingAttempts: 0
        },
        { status: 429 }
      );
    }

    // Check if IP is rate limited
    if (!ipRateCheck.allowed) {
      const resetTime = ipRateCheck.resetTime ? new Date(ipRateCheck.resetTime) : new Date();
      const minutesRemaining = Math.ceil((resetTime.getTime() - Date.now()) / 60000);
      
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        {
          error: `Too many failed attempts from this location. Try again in ${minutesRemaining} minute(s).`,
          rateLimited: true,
          resetTime: resetTime.toISOString(),
          remainingAttempts: 0
        },
        { status: 429 }
      );
    }

    // Find user by username or email
    let user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      console.log("User not found");
      
      // Record failed attempt for both identifier and IP
      await recordFailedLogin(`user:${identifier}`);
      await recordFailedLogin(`ip:${clientIP}`);
      
      // Get updated rate limit info for response
      const rateLimitInfo = await getLoginRateLimitInfo(`user:${identifier}`);
      const delay = calculateLoginDelay(rateLimitInfo.attempts);
      
      if (delay > 0) {
        console.log(`Adding delay of ${delay}ms for repeated failures`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      return NextResponse.json(
        {
          error: "Wrong credentials. Please contact the company to retrieve forgotten passwords",
          remainingAttempts: Math.max(0, 5 - rateLimitInfo.attempts)
        },
        { status: 401 }
      );
    }

    console.log(`User found: ${user.username} (ID: ${user.id})`);

    // Check password
    let passwordMatches = false;

    // First try direct comparison (for new plain text passwords)
    if (user.password === password) {
      console.log("Password matches directly (plain text)");
      passwordMatches = true;

      // Encrypt the password if it's still in plain text and skipSession is false
      if (!skipSession) {
        try {
          console.log(`Encrypting password for user ${user.username} on successful login`);
          const encryptedPassword = encrypt(user.password);
          await User.updateOne(
            { _id: user._id },
            { $set: { password: encryptedPassword } }
          );
          console.log("Password encrypted and updated successfully");
        } catch (encryptError) {
          console.error("Failed to encrypt and update password:", encryptError);
          // Continue with login even if encryption fails
        }
      }
    } else {
      // Try decrypting stored password and comparing
      try {
        const decryptedPassword = decrypt(user.password);
        if (decryptedPassword === password) {
          console.log("Password matches after decryption");
          passwordMatches = true;
        }
      } catch (decryptError) {
        console.log("Failed to decrypt password, trying direct comparison");
        // If decryption fails, try direct comparison as fallback
        if (user.password === password) {
          console.log("Password matches directly (fallback)");
          passwordMatches = true;

          // Encrypt the password if it's still in plain text and skipSession is false
          if (!skipSession) {
            try {
              console.log(`Encrypting password for user ${user.username} on successful login`);
              const encryptedPassword = encrypt(user.password);
              await User.updateOne(
                { _id: user._id },
                { $set: { password: encryptedPassword } }
              );
              console.log("Password encrypted and updated successfully");
            } catch (encryptError) {
              console.error("Failed to encrypt and update password:", encryptError);
              // Continue with login even if encryption fails
            }
          }
        }
      }
    }

    if (!passwordMatches) {
      console.log("Authentication failed: Password mismatch");
      
      // Record failed attempt for both identifier and IP
      await recordFailedLogin(`user:${identifier}`);
      await recordFailedLogin(`ip:${clientIP}`);
      
      // Get updated rate limit info for response
      const rateLimitInfo = await getLoginRateLimitInfo(`user:${identifier}`);
      const delay = calculateLoginDelay(rateLimitInfo.attempts);
      
      if (delay > 0) {
        console.log(`Adding delay of ${delay}ms for repeated failures`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      return NextResponse.json(
        {
          error: "Wrong credentials. Please contact the company to retrieve forgotten passwords",
          remainingAttempts: Math.max(0, 5 - rateLimitInfo.attempts)
        },
        { status: 401 }
      );
    }

    console.log("Authentication successful");

    // Clear rate limits on successful authentication
    await clearLoginRateLimit(`user:${identifier}`);
    // Note: We don't clear IP rate limit as it could be shared by multiple users

    // If skipSession is true, return user data without creating session
    if (skipSession) {
      console.log("Skipping session creation as requested");
      return NextResponse.json({
        message: "Credentials verified successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          permissions: user.permissions,
        },
      });
    }

    // Create a user session by setting a cookie
    const sessionCookie = {
      id: user.id,
      username: user.username,
      email: user.email,
      permissions: user.permissions,
    };

    console.log("Setting session with data:", sessionCookie);
    const cookieStore = await cookies();
    cookieStore.set("robofly_admin_session", JSON.stringify(sessionCookie), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({
      message: "Authentication successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    
    // Record failed attempt on server error as well (to prevent abuse)
    if (identifier) {
      await recordFailedLogin(`user:${identifier}`);
      await recordFailedLogin(`ip:${clientIP}`);
    }
    
    return NextResponse.json(
      { error: "Authentication failed due to server error" },
      { status: 500 }
    );
  }
}