import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
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

    if (!sessionData.permissions?.query?.updateQueryStatus) {
      return NextResponse.json(
        { error: "You don't have permission to update query status" },
        { status: 403 }
      );
    }

    const p = await params;

    const queryId = p.id;
    const requestData = await request.json();
    const { status, requestedBy } = requestData;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Check if ID is valid
    if (!ObjectId.isValid(queryId)) {
      return NextResponse.json(
        { error: "Invalid query ID format" },
        { status: 400 }
      );
    }

    const query = await Query.findById(queryId);
    
    if (!query) {
      return NextResponse.json(
        { error: "Query not found" },
        { status: 404 }
      );
    }

    const oldStatus = query.status;
    query.status = status;
    await query.save();

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Updated query status (ID: ${queryId}, From: ${oldStatus}, To: ${status})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Query status updated successfully",
      query: {
        id: query._id.toString(),
        status: query.status
      }
    });
  } catch (error) {
    console.error("Error updating query status:", error);
    return NextResponse.json(
      { error: "Failed to update query status" },
      { status: 500 }
    );
  }
}