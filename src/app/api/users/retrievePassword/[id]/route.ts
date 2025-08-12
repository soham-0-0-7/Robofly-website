/* eslint-disable @typescript-eslint/no-unused-vars */
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, isEncrypted } from "@/utils/crypto"; // Import the decrypt function

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const requestData = await request.json();
    const { requestedBy } = requestData;

    // Get the session to check permissions
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse the session cookie
    const sessionData = JSON.parse(sessionCookie.value);

    // Check if user has permission to retrieve passwords
    if (!sessionData.permissions?.user?.retrieveUserPassword) {
      return NextResponse.json(
        { error: "You don't have permission to retrieve passwords" },
        { status: 403 }
      );
    }

    const p = await params;
    const userId = parseInt(p.id);

    // Find the user
    const user = await User.findOne({ id: userId }).select(
      "id username password"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let password = user.password;
    if (isEncrypted(user.password)) {
      try {
        password = decrypt(user.password);
      } catch (decryptError) {
        console.error("Error decrypting password:", decryptError);
        return NextResponse.json(
          { error: "Failed to decrypt password" },
          { status: 500 }
        );
      }
    }

    // Decrypt the password
    let decryptedPassword;
    try {
      decryptedPassword = decrypt(user.password);
    } catch (decryptError) {
      console.error("Error decrypting password:", decryptError);
      return NextResponse.json(
        { error: "Failed to decrypt password" },
        { status: 500 }
      );
    }

    // Add log entry for password retrieval
    const log = new Logg({
      username: sessionData.username,
      change: `Retrieved password for user - ${userId}`,
    });
    await log.save();

    // Log the action with requestedBy information (for console only)
    console.log(
      `Password retrieved for user ${userId} by ${requestedBy || "unknown"}`
    );

    return NextResponse.json({
      message: "Password retrieved successfully",
      password: decryptedPassword, // Return the decrypted password
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error retrieving password:", error);
    return NextResponse.json(
      { error: "Failed to retrieve password" },
      { status: 500 }
    );
  }
}
