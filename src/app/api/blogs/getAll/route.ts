import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find({})
      .select("id title image bodyContent")
      .sort({ id: 1 });

    return NextResponse.json(
      {
        message: "Blogs fetched successfully",
        blogs: blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          image: blog.image,
          bodyContent: blog.bodyContent,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}
