import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";
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

    if (!sessionData.permissions?.blog?.addBlogs) {
      return NextResponse.json(
        { error: "You don't have permission to create blogs" },
        { status: 403 }
      );
    }

    const requestData = await request.json();
    const { id, title, image, bodyContent, requestedBy } = requestData;

    if (!id || !title || !image || !bodyContent) {
      return NextResponse.json(
        { error: "All fields are required: id, title, image, bodyContent" },
        { status: 400 }
      );
    }

    // Check if blog with this ID already exists
    const existingBlog = await Blog.findOne({ id });
    if (existingBlog) {
      return NextResponse.json(
        { error: `Blog with ID ${id} already exists` },
        { status: 409 }
      );
    }

    const newBlog = new Blog({
      id,
      title,
      image,
      bodyContent,
    });

    await newBlog.save();

    // Create log entry
    const log = new Logg({
      username: requestedBy || sessionData.username,
      change: `Created new blog (ID: ${id}, Title: ${title})`,
    });
    await log.save();

    return NextResponse.json({
      message: "Blog created successfully",
      blog: {
        id: newBlog.id,
        title: newBlog.title,
        image: newBlog.image,
        bodyContent: newBlog.bodyContent,
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}