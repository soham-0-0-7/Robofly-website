import { dbConnect } from "@/lib/dbConnect";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Try to parse the request body
    let requestedBy = "unknown";
    try {
      const requestData = await request.json();
      requestedBy = requestData.requestedBy || "unknown";
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

    // Check if user has permission to read logs
    if (!sessionData.permissions?.log?.readLogs) {
      return NextResponse.json(
        { error: "You don't have permission to view logs" },
        { status: 403 }
      );
    }

    // Log the action with requestedBy information
    console.log(`Logs list requested by ${requestedBy}`);

    // Add log entry for viewing logs list
    // const log = new Logg({
    //   username: sessionData.username,
    //   change: "Viewed system logs",
    // });
    // await log.save();

    // Fetch all logs from the database
    const logs = await Logg.find({}).sort({ createdAt: -1 });

    // Map logs to return the desired format
    const formattedLogs = logs.map((log) => ({
      id: log._id.toString(),
      username: log.username,
      change: log.change,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({ logs: formattedLogs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}

// Also support GET method for compatibility
export async function GET() {
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

    // Check if user has permission to read logs
    if (!sessionData.permissions?.log?.readLogs) {
      return NextResponse.json(
        { error: "You don't have permission to view logs" },
        { status: 403 }
      );
    }

    // Add log entry for viewing logs list
    // const log = new Logg({
    //   username: sessionData.username,
    //   change: "Viewed system logs",
    // });
    // await log.save();

    // Fetch all logs from the database
    const logs = await Logg.find({}).sort({ createdAt: -1 });

    // Map logs to return the desired format
    const formattedLogs = logs.map((log) => ({
      id: log._id.toString(),
      username: log.username,
      change: log.change,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({ logs: formattedLogs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
