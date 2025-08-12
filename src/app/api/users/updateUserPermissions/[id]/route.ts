import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const sessionData = JSON.parse(sessionCookie.value);

    if (!sessionData.permissions?.user?.updateUserPermissions) {
      return NextResponse.json(
        { error: "You don't have permission to update user permissions" },
        { status: 403 }
      );
    }

    const p = await params;
    const userId = parseInt(p.id);
    if (userId === 1) {
      return NextResponse.json(
        { error: "The administrator's permissions cannot be modified" },
        { status: 403 }
      );
    }
    const requestData = await request.json();
    const { permissions, requestedBy } = requestData;

    if (!permissions) {
      return NextResponse.json(
        { error: "Permissions data is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { permissions },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const log = new Logg({
      username: sessionData.username,
      change: `Updated permissions of user ${userId}`,
    });
    await log.save();

    console.log(
      `Permissions updated for user ${userId} by ${requestedBy || "unknown"}`
    );

    return NextResponse.json({
      message: "User permissions updated successfully",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        permissions: updatedUser.permissions,
      },
    });
  } catch (error) {
    console.error("Error updating user permissions:", error);
    return NextResponse.json(
      { error: "Failed to update user permissions" },
      { status: 500 }
    );
  }
}
