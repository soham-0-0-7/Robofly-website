import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      flightTime,
      cameraSetup,
      cameraSetupOther,
      framePreference,
      needGoggles,
      customTuning,
      comments,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "product-fpv-drone" },
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
      flightTime,
      cameraSetup,
      cameraSetupOther,
      framePreference,
      needGoggles,
      customTuning,
      comments,
    };

    // Create new query
    const query = await Query.create({
      querytype: "product-fpv-drone",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "FPV drone inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in FPV drone form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}
