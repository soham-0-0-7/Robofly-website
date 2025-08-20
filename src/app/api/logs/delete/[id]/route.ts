import { dbConnect } from "@/lib/dbConnect";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // Try to parse the request body
    try {
      await request.json();
    } catch (e) {
      // If body parsing fails, continue with default value
      console.log("No request body or invalid JSON:", e);
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

    // Check if user has permission to delete logs
    if (!sessionData.permissions?.log?.deleteLogs) {
      return NextResponse.json(
        { error: "You don't have permission to delete logs" },
        { status: 403 }
      );
    }

    const p = await params;
    const logId = p.id;
    console.log(logId);

    // Validate that the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return NextResponse.json(
        { error: "Invalid log ID format" },
        { status: 400 }
      );
    }

    // Find and delete the log
    const deletedLog = await Logg.findByIdAndDelete(logId);

    if (!deletedLog) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    // Create a new log entry for this deletion action
    // const newLog = new Logg({
    //   username: sessionData.username,
    //   change: `Deleted log: ${deletedLog.change}`,
    // });
    // await newLog.save();

    return NextResponse.json({
      message: "Log deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting log:", error);
    return NextResponse.json(
      { error: "Failed to delete log" },
      { status: 500 }
    );
  }
}
