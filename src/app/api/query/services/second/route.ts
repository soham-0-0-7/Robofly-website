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
      mappingRequirement,
      areaToBeMapped,
      locationCoordinates,
      terrainType,
      usagePurpose,
      deliveryTimeline,
      additionalRequirements,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "service-drone-mapping" },
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
      mappingRequirement,
      areaToBeMapped,
      locationCoordinates,
      terrainType,
      usagePurpose,
      deliveryTimeline,
      additionalRequirements,
    };

    // Create new query
    const query = await Query.create({
      querytype: "service-drone-mapping",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Mapping service inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in mapping service form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}