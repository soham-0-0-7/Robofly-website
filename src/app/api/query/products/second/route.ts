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
      surveillanceType,
      surveillanceTypeOther,
      flightTime,
      cameraType,
      cameraTypeOther,
      transmissionRange,
      useFrequency,
      operatingEnvironment,
      regulatoryPermissions,
      specialRequirements,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "product-surveillance-drone" },
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
      surveillanceType,
      surveillanceTypeOther,
      flightTime,
      cameraType,
      cameraTypeOther,
      transmissionRange,
      useFrequency,
      operatingEnvironment,
      regulatoryPermissions,
      specialRequirements,
    };

    // Create new query
    const query = await Query.create({
      querytype: "product-surveillance-drone",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Surveillance drone inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in surveillance drone form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}