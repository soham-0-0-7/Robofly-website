import { dbConnect } from "@/lib/dbConnect";
import Query from "@/models/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      firstName,
      lastName,
      gender,
      phone,
      email,
      city,
      state,
      linkedin,
      hearAbout,
      experience,
      education,
      workplace,
      interest,
      message,
      relocate,
      availability,
      currentSalary,
      expectedSalary,
      resume,
      portfolio,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "join-our-team" },
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
      fullName: `${firstName} ${lastName}`,
      gender,
      city,
      state,
      linkedin,
      hearAbout,
      experience,
      education,
      workplace,
      interest,
      message,
      relocate,
      availability,
      currentSalary,
      expectedSalary,
      resume,
      portfolio,
    };

    // Create new query
    const query = await Query.create({
      querytype: "join-our-team",
      name: `${firstName} ${lastName}`,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Application submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in career form submission:", error);
    return NextResponse.json(
      { error: "Error submitting application" },
      { status: 500 }
    );
  }
}