import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";
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

    if (!sessionData.permissions?.blog?.updateBlogs) {
      return NextResponse.json(
        { error: "You don't have permission to update blogs" },
        { status: 403 }
      );
    }

    const p = await params;

    const blogId = parseInt(p.id);
    const requestData = await request.json();
    const { title, image, bodyContent, requestedBy } = requestData;

    if (!title || !image || !bodyContent) {
      return NextResponse.json(
        { error: "All fields are required: title, image, bodyContent" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: blogId },
      {
        title,
        image,
        bodyContent,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Updated blog (ID: ${blogId}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: {
        id: updatedBlog.id,
        title: updatedBlog.title,
        image: updatedBlog.image,
        bodyContent: updatedBlog.bodyContent,
      },
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
