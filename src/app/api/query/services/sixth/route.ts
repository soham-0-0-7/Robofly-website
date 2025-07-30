import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      fullName,
      organizationName,
      email,
      phone,
      regionName,
      affectedArea,
      analysisRequired,
      preferredSensor,
      previousSurveys,
      customParameters,
      desiredTimeline,
      notes,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "service-post-ForestFire-analysis" },
        {
          $or: [{ email: email }, { phone: phone }],
        },
      ],
    });

    if (existingQuery) {
      return NextResponse.json(
        {
          error: "Query already submitted of this type with the given mail / phone",
        },
        { status: 400 }
      );
    }

    // Create data object with remaining fields
    const data = {
      organizationName,
      regionName,
      affectedArea,
      analysisRequired,
      preferredSensor,
      previousSurveys,
      customParameters,
      desiredTimeline,
      notes,
    };

    // Create new query
    const query = await Query.create({
      querytype: "service-post-ForestFire-analysis",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Post-fire analysis inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in post-fire analysis form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}