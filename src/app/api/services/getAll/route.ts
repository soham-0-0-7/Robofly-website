import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const services = await Service.find({})
      .select("id title description mainImage")
      .sort({ id: 1 });

    // Map of Google Drive IDs to Cloudinary IDs if needed
    // const imageMap = {
    //   "specific-drive-id": "cloudinary-id",
    // };

    return NextResponse.json(
      {
        message: "Services fetched successfully",
        services: services.map((service) => {
          return {
            id: service.id,
            title: service.title,
            description: service.description,
            mainImage: service.mainImage || "/images/services/placeholder.jpg",
          };
        }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Error fetching services" },
      { status: 500 }
    );
  }
}
