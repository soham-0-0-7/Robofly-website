// src/app/robofly-admin/dashboard/createUser/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import Image from "next/image";

interface FormData {
  id: number;
  username: string;
  email: string;
  password: string;
  permissions: {
    user: {
      readUser: boolean;
      createUser: boolean;
      updateUserPassword: boolean;
      retrieveUserPassword: boolean;
      deleteUser: boolean;
      updateUserPermissions: boolean;
    };
    product: {
      readProducts: boolean;
      addProducts: boolean;
      updateProducts: boolean;
      deleteProducts: boolean;
    };
    service: {
      readServices: boolean;
      addServices: boolean;
      updateServices: boolean;
      deleteServices: boolean;
    };
    blog: {
      readBlogs: boolean;
      addBlogs: boolean;
      updateBlogs: boolean;
      deleteBlogs: boolean;
    };
    query: {
      readQueries: boolean;
      deleteQueries: boolean;
      // updateQueries: boolean;
      updateQueryStatus: boolean;
    };
    log: {
      readLogs: boolean;
      deleteLogs: boolean;
    };
  };
}

export default function CreateUserPage() {
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    username: "",
    email: "",
    password: "",
    permissions: {
      user: {
        readUser: false,
        createUser: false,
        updateUserPassword: false,
        retrieveUserPassword: false,
        deleteUser: false,
        updateUserPermissions: false,
      },
      product: {
        readProducts: false,
        addProducts: false,
        updateProducts: false,
        deleteProducts: false,
      },
      service: {
        readServices: false,
        addServices: false,
        updateServices: false,
        deleteServices: false,
      },
      blog: {
        readBlogs: false,
        addBlogs: false,
        updateBlogs: false,
        deleteBlogs: false,
      },
      query: {
        readQueries: false,
        deleteQueries: false,
        // updateQueries: false,
        updateQueryStatus: false,
      },
      log: {
        readLogs: false,
        deleteLogs: false,
      },
    },
  });

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/users/session");
        const data = await response.json();

        if (!response.ok || !data.authenticated) {
          setSessionError("You are not authenticated. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!data.user) {
          setSessionError("Invalid session data. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!data.user.permissions?.user?.createUser) {
          setSessionError(
            "You don't have permission to create users. Redirecting to dashboard..."
          );
          setTimeout(() => router.push("/robofly-admin/dashboard"), 2000);
          return;
        }

        fetchNextAvailableId();
      } catch (error) {
        console.error("Error checking session:", error);
        setSessionError(
          "Failed to verify your session. Redirecting to login..."
        );
        setTimeout(() => router.push("/robofly-admin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const fetchNextAvailableId = async () => {
    try {
      const response = await fetch("/api/users/getAll");
      const data = await response.json();

      if (response.ok && data.users) {
        const maxId = data.users.reduce(
          (max: number, user: { id: number }) =>
            user.id > max ? user.id : max,
          0
        );
        setFormData((prev) => ({ ...prev, id: maxId + 1 }));
      }
    } catch (error) {
      console.error("Error fetching users for ID:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (message) setMessage(null);
  };

  const handlePermissionChange = (
    category: string,
    permission: string,
    checked: boolean
  ) => {
    // If unchecking a read permission, uncheck all other permissions in the category
    if (permission.startsWith("read") && !checked) {
      const categoryKey = category as keyof typeof formData.permissions;
      const categoryPermissions: Record<string, boolean> = {
        ...formData.permissions[categoryKey],
      };

      Object.keys(categoryPermissions).forEach((key) => {
        categoryPermissions[key] = false;
      });

      setFormData({
        ...formData,
        permissions: {
          ...formData.permissions,
          [category]: categoryPermissions,
        },
      });

      return;
    }

    // For non-read permissions, make sure read permission is enabled
    if (!permission.startsWith("read") && checked) {
      const categoryKey = category as keyof typeof formData.permissions;

      const readPermissionMap: Record<string, string> = {
        user: "readUser",
        product: "readProducts",
        service: "readServices",
        blog: "readBlogs",
        query: "readQueries",
        log: "readLogs",
      };

      const readPermissionKey = readPermissionMap[
        category
      ] as keyof (typeof formData.permissions)[typeof categoryKey];

      if (!formData.permissions[categoryKey][readPermissionKey]) {
        setMessage({
          type: "error",
          text: `You must enable the read permission for "${category}" before enabling other permissions in this category.`,
        });
        return;
      }
    }

    // Normal permission update
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [category]: {
          ...formData.permissions[
            category as keyof typeof formData.permissions
          ],
          [permission]: checked,
        },
      },
    });

    if (message) setMessage(null);
  };

  const renderPermissionSection = (
    categoryName: string,
    categoryKey: keyof typeof formData.permissions,
    displayName: string
  ) => {
    const permissions = formData.permissions[categoryKey];

    const readPermissionMap: Record<string, string> = {
      user: "readUser",
      product: "readProducts",
      service: "readServices",
      blog: "readBlogs",
      query: "readQueries",
      log: "readLogs",
    };

    const readPermissionKey = readPermissionMap[
      categoryKey
    ] as keyof typeof permissions;
    const isReadPermissionChecked = permissions[readPermissionKey];

    return (
      <div className="mb-6" key={categoryKey}>
        <h5 className="text-md font-medium text-gray-700 mb-2 pb-1 border-b">
          {displayName}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(permissions).map(([permission, value]) => {
            const isReadPermission = permission.startsWith("read");

            if (isReadPermission) {
              return (
                <div
                  key={`${categoryKey}.${permission}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`${categoryKey}.${permission}`}
                    checked={value}
                    onChange={(e) =>
                      handlePermissionChange(
                        categoryKey,
                        permission,
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${categoryKey}.${permission}`}
                    className="text-sm text-gray-700 font-medium"
                  >
                    {permission
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              );
            }

            if (isReadPermissionChecked) {
              return (
                <motion.div
                  key={`${categoryKey}.${permission}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2 ml-6"
                >
                  <input
                    type="checkbox"
                    id={`${categoryKey}.${permission}`}
                    checked={value}
                    onChange={(e) =>
                      handlePermissionChange(
                        categoryKey,
                        permission,
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${categoryKey}.${permission}`}
                    className="text-sm text-gray-600"
                  >
                    {permission
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setMessage(null);

    try {
      const sessionResponse = await fetch("/api/users/session");
      const sessionData = await sessionResponse.json();
      const currentUsername = sessionData.user?.username || "unknown";

      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          requestedBy: currentUsername,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      setMessage({
        type: "success",
        text: "User created successfully!",
      });

      setFormData({
        id: formData.id + 1,
        username: "",
        email: "",
        password: "",
        permissions: {
          user: {
            readUser: false,
            createUser: false,
            updateUserPassword: false,
            retrieveUserPassword: false,
            deleteUser: false,
            updateUserPermissions: false,
          },
          product: {
            readProducts: false,
            addProducts: false,
            updateProducts: false,
            deleteProducts: false,
          },
          service: {
            readServices: false,
            addServices: false,
            updateServices: false,
            deleteServices: false,
          },
          blog: {
            readBlogs: false,
            addBlogs: false,
            updateBlogs: false,
            deleteBlogs: false,
          },
          query: {
            readQueries: false,
            deleteQueries: false,
            // updateQueries: false,
            updateQueryStatus: false,
          },
          log: {
            readLogs: false,
            deleteLogs: false,
          },
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Loading form..." />
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-600 text-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">
            Session Error
          </h2>
          <p className="text-gray-600 text-center mb-4">{sessionError}</p>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/robofly.png"
                alt="Robofly Logo"
                fill
                sizes="40px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              <span style={{ color: colorPalette.green3 }}>ROBOFLY</span>{" "}
              <span style={{ color: colorPalette.blackMuted }}>ADMIN</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create New User
            </h2>
            <button
              onClick={() => router.push("/robofly-admin/dashboard")}
              className="px-4 py-2 flex items-center text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-medium text-gray-800">
                User Information
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter the details for the new user account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="col-span-1">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    User ID
                  </label>
                  <input
                    type="number"
                    name="id"
                    id="id"
                    required
                    value={formData.id}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address ( the credentials on password update and user creation will be mailed on this email and user receives otp for login on this email as well )
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">
                  User Permissions
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Select the read permission first to enable other permissions
                  in each category.
                </p>

                {renderPermissionSection("user", "user", "User Management")}
                {renderPermissionSection(
                  "product",
                  "product",
                  "Product Management"
                )}
                {renderPermissionSection(
                  "service",
                  "service",
                  "Service Management"
                )}
                {renderPermissionSection("blog", "blog", "Blog Management")}
                {renderPermissionSection("query", "query", "Query Management")}
                {renderPermissionSection("log", "log", "Log Management")}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    formSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {formSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating User...
                    </span>
                  ) : (
                    "Create User"
                  )}
                </button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {message.type === "success" ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{message.text}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
