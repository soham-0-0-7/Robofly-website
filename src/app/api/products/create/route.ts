import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/product";
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

    if (!sessionData.permissions?.product?.addProducts) {
      return NextResponse.json(
        { error: "You don't have permission to create products" },
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

    // Check if product with this ID already exists
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return NextResponse.json(
        { error: `Product with ID ${id} already exists` },
        { status: 409 }
      );
    }

    const newProduct = new Product({
      id,
      title,
      description,
      mainImage,
    });

    await newProduct.save();

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Created new product (ID: ${id}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Product created successfully",
      product: {
        id: newProduct.id,
        title: newProduct.title,
        description: newProduct.description,
        mainImage: newProduct.mainImage,
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}