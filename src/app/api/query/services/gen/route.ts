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
      services,
      otherService,
      description,
      state,
      city,
      address,
      areaSize,
      timelineFrom,
      timelineTo,
      frequency,
      otherFrequency,
      specialRequirements,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "service-general-form" },
        {
          $or: [{ email: email }, { phone: phone }],
        },
      ],
    });

    if (existingQuery) {
      return NextResponse.json(
        {
          error:
            "Query already submitted of this type with the given mail / phone",
        },
        { status: 400 }
      );
    }

    // Create data object with remaining fields
    const data = {
      organizationName,
      services,
      otherService,
      description,
      state,
      city,
      address,
      areaSize,
      timelineFrom,
      timelineTo,
      frequency,
      otherFrequency,
      specialRequirements,
    };

    // Create new query
    const query = await Query.create({
      querytype: "service-general-form",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Service inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in general service form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}
