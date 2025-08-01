import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
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
        { error: "You don't have permission to view queries" },
        { status: 403 }
      );
    }

    const queries = await Query.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      queries: queries.map(query => ({
        id: query._id.toString(),
        name: query.name,
        email: query.email,
        phone: query.phone,
        querytype: query.querytype,
        status: query.status,
        data: query.data,
        createdAt: query.createdAt
      }))
    });
  } catch (error) {
    console.error("Error fetching queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}