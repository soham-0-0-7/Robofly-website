// src/app/api/users/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
      // Parse the session cookie
      const sessionData = JSON.parse(sessionCookie.value);
      
      // Make sure we have the expected fields
      if (!sessionData.id || !sessionData.username) {
        console.error("Invalid session data structure:", sessionData);
        return NextResponse.json({ authenticated: false }, { status: 401 });
      }

      // Return user info with the complete permissions structure
      return NextResponse.json({
        authenticated: true,
        user: {
          id: sessionData.id,
          username: sessionData.username,
          email: sessionData.email,
          permissions: sessionData.permissions || {}
        }
      });
    } catch (parseError) {
      console.error("Error parsing session cookie:", parseError);
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}