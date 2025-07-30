import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      fullName,
      companyName,
      email,
      phone,
      packageNature,
      packageWeight,
      deliveryDistance,
      deliveryFrequency,
      payloadCapacity,
      securityRequirements,
      gpsTracking,
      routeTerrain,
      additionalComments,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "product-logistics-drone" },
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
      companyName,
      packageNature,
      packageWeight,
      deliveryDistance,
      deliveryFrequency,
      payloadCapacity,
      securityRequirements,
      gpsTracking,
      routeTerrain,
      additionalComments,
    };

    // Create new query
    const query = await Query.create({
      querytype: "product-logistics-drone",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Logistics drone inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in logistics drone form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}
