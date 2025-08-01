import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({})
      .select("id title description mainImage")
      .sort({ id: 1 });

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products: products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          mainImage: product.mainImage,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
