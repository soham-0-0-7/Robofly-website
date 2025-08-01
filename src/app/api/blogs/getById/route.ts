import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Extract the id from the request URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blogId = parseInt(id, 10);
    const blog = await Blog.findOne({ id: blogId });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Blog fetched successfully",
        blog: {
          id: blog.id,
          title: blog.title,
          image: blog.image,
          bodyContent: blog.bodyContent,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
  }
}
