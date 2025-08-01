import { cookies } from "next/headers";

interface UserSession {
  id: number;
  username: string;
  email: string;
  permissions: Record<string, boolean>;
}

export const sessionService = {
  getSession: async (): Promise<UserSession | null> => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("robofly_admin_session");

    if (!sessionCookie) {
      return null;
    }

    try {
      return JSON.parse(sessionCookie.value);
    } catch (error) {
      console.error("Error parsing session cookie:", error);
      return null;
    }
  },

  endSession: async () => {
    const cookieStore = await cookies();
    cookieStore.set("robofly_admin_session", "", {
      maxAge: 0,
      path: "/",
    });
  },
};
