import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import Logg from "@/models/logs"; // Add import for Logs model
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    // Get request body if available
    try {
      await request.json();
    } catch (e) {
      // If no body or parsing fails, continue
      console.log(e);
    }

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

    // Check if user has permission to delete users
    if (!sessionData.permissions?.user?.deleteUser) {
      return NextResponse.json(
        { error: "You don't have permission to delete users" },
        { status: 403 }
      );
    }

    const p = await params;

    const userId = parseInt(p.id);
    if (userId === 1) {
      return NextResponse.json(
        { error: "The administrator account cannot be deleted" },
        { status: 403 }
      );
    }

    // Check if user is trying to delete themselves
    if (sessionData.id === userId) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ id: userId });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add log entry for user deletion
    const log = new Logg({
      username: sessionData.username, // Use the session username
      change: `Deleted user - ${userId}`,
    });
    await log.save();

    return NextResponse.json({
      message: "User deleted successfully",
      user: {
        id: deletedUser.id,
        username: deletedUser.username,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
