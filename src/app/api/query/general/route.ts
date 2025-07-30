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
      querytype,
      organizationName,
      city,
      state,
      address,
      queryType,
      additionalInfo,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "general-form" },
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
      city,
      state,
      address,
      queryDetails: queryType,
      additionalInfo,
    };

    // Create new query
    const query = await Query.create({
      querytype,
      name: fullName,
      email,
      phone,
      status: "employees write the progress here - pending right now",
      data,
    });

    return NextResponse.json(
      { message: "Query submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in general query submission:", error);
    return NextResponse.json(
      { error: "Error submitting query" },
      { status: 500 }
    );
  }
}
