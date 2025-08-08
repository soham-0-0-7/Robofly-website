import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/product";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
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

    if (!sessionData.permissions?.product?.updateProducts) {
      return NextResponse.json(
        { error: "You don't have permission to update products" },
        { status: 403 }
      );
    }

    const p = await params;

    const productId = parseInt(p.id);
    const requestData = await request.json();
    const { title, description, mainImage, requestedBy } = requestData;

    if (!title || !description || !mainImage) {
      return NextResponse.json(
        { error: "All fields are required: title, description, mainImage" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      {
        title,
        description,
        mainImage,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Updated product (ID: ${productId}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Product updated successfully",
      product: {
        id: updatedProduct.id,
        title: updatedProduct.title,
        description: updatedProduct.description,
        mainImage: updatedProduct.mainImage,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
