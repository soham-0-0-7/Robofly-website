import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/service";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    if (!sessionData.permissions?.service?.deleteServices) {
      return NextResponse.json(
        { error: "You don't have permission to delete services" },
        { status: 403 }
      );
    }

    const p = await params;

    const serviceId = parseInt(p.id);
    const requestData = await request.json();
    const { requestedBy } = requestData;

    const service = await Service.findOne({ id: serviceId });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const serviceTitle = service.title;
    await Service.deleteOne({ id: serviceId });

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Deleted service (ID: ${serviceId}, Title: ${serviceTitle})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
