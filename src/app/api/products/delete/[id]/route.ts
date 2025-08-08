import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/product";
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

    if (!sessionData.permissions?.product?.deleteProducts) {
      return NextResponse.json(
        { error: "You don't have permission to delete products" },
        { status: 403 }
      );
    }

    const p = await params;

    const productId = parseInt(p.id);
    const requestData = await request.json();
    const { requestedBy } = requestData;

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productTitle = product.title;
    await Product.deleteOne({ id: productId });

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Deleted product (ID: ${productId}, Title: ${productTitle})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
