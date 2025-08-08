import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function DELETE(
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

    if (!sessionData.permissions?.query?.deleteQueries) {
      return NextResponse.json(
        { error: "You don't have permission to delete queries" },
        { status: 403 }
      );
    }

    const p = await params;

    const queryId = p.id;
    const requestData = await request.json();
    const { requestedBy } = requestData;

    // Check if ID is valid
    if (!ObjectId.isValid(queryId)) {
      return NextResponse.json(
        { error: "Invalid query ID format" },
        { status: 400 }
      );
    }

    const query = await Query.findById(queryId);

    if (!query) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    // Create log entry before deletion
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Deleted query (ID: ${queryId}, Type: ${query.querytype}, From: ${query.name})`,
    });
    await log.save();

    // Delete the query
    await Query.findByIdAndDelete(queryId);

    return NextResponse.json({
      message: "Query deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting query:", error);
    return NextResponse.json(
      { error: "Failed to delete query" },
      { status: 500 }
    );
  }
}
