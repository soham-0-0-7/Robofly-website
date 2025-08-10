"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import Image from "next/image";
import {
  validateSessionData,
  clearInvalidSession,
} from "@/utils/sessionValidator";

interface LoginFormData {
  identifier: string;
  password: string;
}

export default function RoboflyAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessionChecking, setSessionChecking] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Session validation effect
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        setSessionChecking(true);
        console.log("Checking for existing session...");

        const response = await fetch("/api/users/session", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log("Session check response:", data);

        if (response.ok && data.authenticated) {
          // Validate session data completeness
          const isValidSession = validateSessionData(data.user);

          if (isValidSession) {
            console.log("Valid session found, redirecting to dashboard...");
            setMessage({
              type: "info",
              text: "Valid session found. Redirecting to dashboard...",
            });

            // Redirect to dashboard after a brief delay
            setTimeout(() => {
              router.push("/robofly-admin/dashboard");
            }, 1000);
            return;
          } else {
            // Session exists but is incomplete/invalid
            console.log("Invalid session data found, clearing session...");
            setMessage({
              type: "error",
              text: "Invalid session detected. Clearing and requiring re-login...",
            });

            await clearInvalidSession();

            // Clear the message after 3 seconds
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        } else {
          // No valid session found
          console.log("No valid session found");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setMessage({
          type: "error",
          text: "Failed to check session. Please try logging in.",
        });

        // Try to clear any potentially corrupted session
        await clearInvalidSession();

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } finally {
        setSessionChecking(false);
        setLoading(false);
      }
    };

    checkExistingSession();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier.trim() || !formData.password.trim()) {
      setMessage({
        type: "error",
        text: "Please enter both username/email and password.",
      });
      return;
    }

    setFormSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Validate the new session data
        const isValidSession = validateSessionData(data.user);

        if (isValidSession) {
          setMessage({
            type: "success",
            text: "Login successful! Redirecting to dashboard...",
          });

          setTimeout(() => {
            router.push("/robofly-admin/dashboard");
          }, 1000);
        } else {
          setMessage({
            type: "error",
            text: "Login successful but session data is incomplete. Please contact administrator.",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: data.error || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        type: "error",
        text: "An error occurred during login. Please try again.",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Show loading spinner while checking session
  if (loading || sessionChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Checking session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image
              src="/images/robofly.png"
              alt="Robofly Logo"
              fill
              sizes="80px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            <span style={{ color: colorPalette.green3 }}>ROBOFLY</span>{" "}
            <span style={{ color: colorPalette.blackMuted }}>ADMIN</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : message.type === "info"
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "bg-red-50 text-red-800 border border-red-200"
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
                  ) : message.type === "info" ? (
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Username or Email
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
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
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              For password recovery, please contact the system administrator
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
