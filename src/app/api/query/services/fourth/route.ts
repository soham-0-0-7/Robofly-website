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
      assetType,
      inspectionPurpose,
      areaOrUnits,
      requiredSensor,
      inspectionFrequency,
      dataOutputFormat,
      regulatoryRequirements,
      customDeliverables,
      startDate,
      endDate,
      notesAttachments,
    } = body;

    // Check for existing queries
    const existingQuery = await Query.findOne({
      $and: [
        { querytype: "service-drone-inspection" },
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
      assetType,
      inspectionPurpose,
      areaOrUnits,
      requiredSensor,
      inspectionFrequency,
      dataOutputFormat,
      regulatoryRequirements,
      customDeliverables,
      startDate,
      endDate,
      notesAttachments,
    };

    // Create new query
    const query = await Query.create({
      querytype: "service-drone-inspection",
      name: fullName,
      email,
      phone,
      status: "pending",
      data,
    });

    return NextResponse.json(
      { message: "Inspection service inquiry submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in inspection service form submission:", error);
    return NextResponse.json(
      { error: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}