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
      forestArea,
      servicesRequired,
      pastFireHistory,
      availableGISData,
      needAIMLModels,
      preferredDeliveryFormat,
      timelineToDeploy,
      governmentPermits,
      additionalNeeds,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "service-forestfire-predictionAndEradication" },
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
      forestArea,
      servicesRequired,
      pastFireHistory,
      availableGISData,
      needAIMLModels,
      preferredDeliveryFormat,
      timelineToDeploy,
      governmentPermits,
      additionalNeeds,
    };

    // Create new query
    const query = await Query.create({
      querytype: "service-forestfire-predictionAndEradication",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Forest fire service inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in forest fire service form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}