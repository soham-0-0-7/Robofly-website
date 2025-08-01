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

    // Set a default querytype if it's not provided
    const effectiveQuerytype = querytype || "general-form";

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: effectiveQuerytype },
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

    // Create new query with the effective querytype
    const query = await Query.create({
      querytype: effectiveQuerytype,
      name: fullName,
      email,
      phone,
      status: "pending",
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
