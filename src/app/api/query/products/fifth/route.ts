import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      fullName,
      institutionName,
      email,
      phone,
      unitsRequired,
      kitRequirement,
      additionalComponents,
      trainingRequired,
      deliveryTimeline,
      comments,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "product-training-drone" },
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
      institutionName,
      unitsRequired,
      kitRequirement,
      additionalComponents,
      trainingRequired,
      deliveryTimeline,
      comments,
    };

    // Create new query
    const query = await Query.create({
      querytype: "product-training-drone",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Training drone inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in training drone form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}
