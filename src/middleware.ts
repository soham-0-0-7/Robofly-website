import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith("/robofly-admin/dashboard");

  // Login page
  const loginUrl = new URL("/robofly-admin", request.url);

  // Check for admin session cookie
  const sessionCookie = request.cookies.get("robofly_admin_session")?.value;

  // If trying to access protected routes without session, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/robofly-admin/dashboard/:path*"],
};
