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

    // Get the session to check permissions
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse the session cookie
    const sessionData = JSON.parse(sessionCookie.value);

    // Check if user has permission to update blogs
    if (!sessionData.permissions?.blog?.updateBlog) {
      return NextResponse.json(
        { error: "You don't have permission to update blogs" },
        { status: 403 }
      );
    }

    // Await the params - THIS IS THE KEY FIX
    const { id } = await params;
    const blogId = parseInt(id);

    // Get the request body
    const body = await request.json();
    const { title, content, author, tags, status } = body;

    // Find and update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { id: blogId },
      {
        title,
        content,
        author,
        tags,
        status,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Add log entry for blog update
    const log = new Logg({
      username: sessionData.username,
      change: `Updated blog - ${blogId}: ${title}`,
    });
    await log.save();

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
