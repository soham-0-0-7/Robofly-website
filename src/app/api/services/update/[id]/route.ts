import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/service";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    if (!sessionData.permissions?.service?.updateServices) {
      return NextResponse.json(
        { error: "You don't have permission to update services" },
        { status: 403 }
      );
    }

    const p = await params;

    const serviceId = parseInt(p.id);
    const requestData = await request.json();
    const { title, description, mainImage, requestedBy } = requestData;

    if (!title || !description || !mainImage) {
      return NextResponse.json(
        { error: "All fields are required: title, description, mainImage" },
        { status: 400 }
      );
    }

    const updatedService = await Service.findOneAndUpdate(
      { id: serviceId },
      {
        title,
        description,
        mainImage,
      },
      { new: true }
    );

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Updated service (ID: ${serviceId}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Service updated successfully",
      service: {
        id: updatedService.id,
        title: updatedService.title,
        description: updatedService.description,
        mainImage: updatedService.mainImage,
      },
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}
