// Create this file: src/utils/sessionValidator.ts
interface SessionData {
  id: number;
  username: string;
  email: string;
  permissions: Record<string, any>;
}

export const validateSessionData = (
  sessionData: any
): sessionData is SessionData => {
  // Check if sessionData exists and is an object
  if (!sessionData || typeof sessionData !== "object") {
    return false;
  }

  // Check required fields
  const requiredFields = ["id", "username", "email", "permissions"];
  for (const field of requiredFields) {
    if (!sessionData[field]) {
      return false;
    }
  }

  // Validate specific field types
  if (typeof sessionData.id !== "number" || sessionData.id <= 0) {
    return false;
  }

  if (
    typeof sessionData.username !== "string" ||
    sessionData.username.trim() === ""
  ) {
    return false;
  }

  if (
    typeof sessionData.email !== "string" ||
    sessionData.email.trim() === ""
  ) {
    return false;
  }

  if (
    typeof sessionData.permissions !== "object" ||
    sessionData.permissions === null
  ) {
    return false;
  }

  // Check if permissions object has the expected structure
  const expectedPermissionCategories = [
    "user",
    "blog",
    "product",
    "service",
    "query",
    "log",
  ];
  for (const category of expectedPermissionCategories) {
    if (
      !sessionData.permissions[category] ||
      typeof sessionData.permissions[category] !== "object"
    ) {
      return false;
    }
  }

  return true;
};

export const clearInvalidSession = async (): Promise<void> => {
  try {
    await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to clear session:", error);
    // Force clear cookie client-side as fallback
    document.cookie =
      "robofly_admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};
