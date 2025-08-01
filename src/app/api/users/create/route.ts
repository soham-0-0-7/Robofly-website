// filepath: c:\Users\soham\OneDrive\Desktop\Robofly - internship\website\robofly-website\src\app\api\users\create\route.ts
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import Logg from "@/models/logs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/utils/crypto"; // Import the encrypt function

export async function POST(request: Request) {
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

    // Check if user has permission to create users
    if (!sessionData.permissions?.user?.createUser) {
      return NextResponse.json(
        { error: "You don't have permission to create users" },
        { status: 403 }
      );
    }

    // Get the user data from the request
    const userData = await request.json();
    
    // Create a copy without requestedBy for saving to database
    const userDataWithoutRequestedBy = { ...userData };
    delete userDataWithoutRequestedBy.requestedBy;
    
    // Encrypt the password before saving
    if (userDataWithoutRequestedBy.password) {
      userDataWithoutRequestedBy.password = encrypt(userDataWithoutRequestedBy.password);
    }

    // Check if the ID, username, or email already exists
    const existingUserWithId = await User.findOne({ id: userData.id });
    if (existingUserWithId) {
      return NextResponse.json(
        { error: "A user with this ID already exists" },
        { status: 400 }
      );
    }

    const existingUserWithUsername = await User.findOne({
      username: userData.username,
    });
    if (existingUserWithUsername) {
      return NextResponse.json(
        { error: "A user with this username already exists" },
        { status: 400 }
      );
    }

    const existingUserWithEmail = await User.findOne({ email: userData.email });
    if (existingUserWithEmail) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Create the new user
    const newUser = new User(userDataWithoutRequestedBy);
    await newUser.save();

    // Add log entry for user creation
    const log = new Logg({
      username: sessionData.username,
      change: `Created user - ${newUser.id}`,
    });
    await log.save();

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}