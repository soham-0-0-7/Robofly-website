import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";
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

    if (!sessionData.permissions?.blog?.deleteBlogs) {
      return NextResponse.json(
        { error: "You don't have permission to delete blogs" },
        { status: 403 }
      );
    }

    const p = await params;

    const blogId = parseInt(p.id);
    const requestData = await request.json();
    const { requestedBy } = requestData;

    const blog = await Blog.findOne({ id: blogId });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blogTitle = blog.title;
    await Blog.deleteOne({ id: blogId });

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Deleted blog (ID: ${blogId}, Title: ${blogTitle})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
