import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/service";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const sessionData = JSON.parse(sessionCookie.value);

    if (!sessionData.permissions?.service?.addServices) {
      return NextResponse.json(
        { error: "You don't have permission to create services" },
        { status: 403 }
      );
    }

    const requestData = await request.json();
    const { id, title, description, mainImage, requestedBy } = requestData;

    if (!id || !title || !description || !mainImage) {
      return NextResponse.json(
        { error: "All fields are required: id, title, description, mainImage" },
        { status: 400 }
      );
    }

    // Check if service with this ID already exists
    const existingService = await Service.findOne({ id });
    if (existingService) {
      return NextResponse.json(
        { error: `Service with ID ${id} already exists` },
        { status: 409 }
      );
    }

    const newService = new Service({
      id,
      title,
      description,
      mainImage,
    });

    await newService.save();

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Created new service (ID: ${id}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Service created successfully",
      service: {
        id: newService.id,
        title: newService.title,
        description: newService.description,
        mainImage: newService.mainImage,
      },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}