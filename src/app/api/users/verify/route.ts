import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, isEncrypted, encrypt } from "@/utils/crypto";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/email and password are required" },
        { status: 400 }
      );
    }

    console.log(`Authentication attempt for: ${identifier}`);

    // Check if the identifier is an email or username
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      console.log(`User not found: ${identifier}`);
      return NextResponse.json(
        { error: "Inexistent username / email" },
        { status: 401 }
      );
    }

    console.log(`User found: ${user.username} (ID: ${user.id})`);
    console.log(`Stored password format: ${isEncrypted(user.password) ? 'Encrypted' : 'Plain'}`);

    // Determine if stored password is encrypted and handle appropriately
    let passwordMatches = false;
    
    if (isEncrypted(user.password)) {
      // Password is encrypted, decrypt it and compare
      try {
        console.log("Decrypting stored password...");
        const decryptedPassword = decrypt(user.password);
        console.log(`Input password: ${password}`);
        console.log(`Decrypted stored password: ${decryptedPassword}`);
        
        // Use a more careful comparison
        passwordMatches = decryptedPassword === password;
        console.log(`Password match result: ${passwordMatches}`);
      } catch (decryptError) {
        console.error("Error during password decryption:", decryptError);
        return NextResponse.json(
          { error: "Authentication failed during decryption" },
          { status: 500 }
        );
      }
    } else {
      // Password is not encrypted, compare directly
      console.log("Using direct comparison for unencrypted password");
      passwordMatches = user.password === password;
      console.log(`Password match result: ${passwordMatches}`);
      
      // Auto-encrypt the password if it matches
      if (passwordMatches) {
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

    if (!passwordMatches) {
      console.log("Authentication failed: Password mismatch");
      return NextResponse.json(
        {
          error:
            "Wrong credentials. Please contact the company to retrieve forgotten passwords",
        },
        { status: 401 }
      );
    }

    console.log("Authentication successful");
    
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
    return NextResponse.json(
      { error: "Authentication failed due to server error" },
      { status: 500 }
    );
  }
}