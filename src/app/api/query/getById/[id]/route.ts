import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(
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

    if (!sessionData.permissions?.query?.readQueries) {
      return NextResponse.json(
        { error: "You don't have permission to view query details" },
        { status: 403 }
      );
    }

    const p = await params;

    const queryId = p.id;
    
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

    return NextResponse.json({
      query: {
        id: query._id.toString(),
        name: query.name,
        email: query.email,
        phone: query.phone,
        querytype: query.querytype,
        status: query.status,
        data: query.data,
        createdAt: query.createdAt
      }
    });
  } catch (error) {
    console.error("Error fetching query:", error);
    return NextResponse.json(
      { error: "Failed to fetch query" },
      { status: 500 }
    );
  }
}