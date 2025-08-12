import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/utils/crypto";
import { sendPasswordUpdatedEmail } from "@/utils/emailCreds"; // Add this import

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

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

    // Check if user has permission to update passwords
    if (!sessionData.permissions?.user?.updateUserPassword) {
      return NextResponse.json(
        { error: "You don't have permission to update passwords" },
        { status: 403 }
      );
    }

    const p = await params;

    const userId = parseInt(p.id);
    const requestData = await request.json();
    const { password } = requestData;

    if (!password || password.trim() === "") {
      return NextResponse.json(
        { error: "Password cannot be empty" },
        { status: 400 }
      );
    }

    // Find the user first to get email for sending notification
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Store the plain password for email
    const plainPassword = password;

    // Encrypt the password
    const encryptedPassword = encrypt(password);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { password: encryptedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send email notification about password change
    try {
      const emailResult = await sendPasswordUpdatedEmail(
        user.email,
        user.username,
        plainPassword
      );

      if (!emailResult.success) {
        console.error(
          "Failed to send password updated email:",
          emailResult.error
        );
        // Log the email failure but don't fail the password update
      }
    } catch (emailError) {
      console.error("Error sending password updated email:", emailError);
      // Continue with password update even if email fails
    }

    // Add log entry for password update
    const log = new Logg({
      username: sessionData.username,
      change: `Updated password for user - ${userId}`,
    });
    await log.save();

    return NextResponse.json({
      message: "Password updated successfully",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
