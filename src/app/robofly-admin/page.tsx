"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import OTPModal from "@/components/common/OTPModal"; // Add this import
import Image from "next/image";
import {
  validateSessionData,
  clearInvalidSession,
} from "@/utils/sessionValidator";

interface LoginFormData {
  identifier: string;
  password: string;
}

// Add interface for pending login data
interface PendingLoginData {
  identifier: string;
  password: string;
  email: string;
  username: string;
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
    type: "success" | "error" | "info" | "warning";
    text: string;
  } | null>(null);

  // Add OTP modal states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingLoginData, setPendingLoginData] =
    useState<PendingLoginData | null>(null);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  // Add rate limiting states
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(
    null
  );
  const [rateLimitResetTime, setRateLimitResetTime] = useState<string | null>(
    null
  );
  const [isRateLimited, setIsRateLimited] = useState(false);

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

  // Rate limit countdown effect
  useEffect(() => {
    if (isRateLimited && rateLimitResetTime) {
      const interval = setInterval(() => {
        const resetTime = new Date(rateLimitResetTime).getTime();
        const now = Date.now();
        const timeRemaining = resetTime - now;

        if (timeRemaining <= 0) {
          setIsRateLimited(false);
          setRateLimitResetTime(null);
          setMessage(null);
          clearInterval(interval);
        } else {
          const minutes = Math.ceil(timeRemaining / 60000);
          setMessage({
            type: "warning",
            text: `Too many failed attempts. Try again in ${minutes} minute(s).`,
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRateLimited, rateLimitResetTime]);

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

    if (isRateLimited) {
      setMessage({
        type: "warning",
        text: "Please wait before trying again.",
      });
      return;
    }

    setFormSubmitting(true);
    setMessage(null);

    try {
      // First verify credentials without creating session
      const response = await fetch("/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skipSession: true, // Add flag to skip session creation
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        // Rate limited
        setIsRateLimited(true);
        setRateLimitResetTime(data.resetTime);
        setRemainingAttempts(data.remainingAttempts);
        setMessage({
          type: "warning",
          text:
            data.error || "Too many failed attempts. Please try again later.",
        });
        return;
      }

      if (response.ok) {
        // Credentials are valid, now send OTP
        const otpResponse = await fetch("/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
            name: data.user.username,
            purpose: "login", // Add purpose to distinguish from other OTPs
          }),
        });

        const otpData = await otpResponse.json();

        if (otpResponse.ok) {
          // Store pending login data and show OTP modal
          setPendingLoginData({
            identifier: formData.identifier,
            password: formData.password,
            email: data.user.email,
            username: data.user.username,
          });
          setShowOTPModal(true);
          setMessage({
            type: "info",
            text: "OTP sent to your email. Please check and enter the code.",
          });
        } else {
          setMessage({
            type: "error",
            text: otpData.error || "Failed to send OTP. Please try again.",
          });
        }
      } else {
        // Handle login failure
        setRemainingAttempts(data.remainingAttempts || null);

        let errorMessage =
          data.error || "Login failed. Please check your credentials.";
        if (
          data.remainingAttempts !== undefined &&
          data.remainingAttempts > 0
        ) {
          errorMessage += ` ${data.remainingAttempts} attempt(s) remaining.`;
        }

        setMessage({
          type: "error",
          text: errorMessage,
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

  // Handle OTP verification
  const handleOTPVerify = async (otp: string): Promise<boolean> => {
    if (!pendingLoginData) return false;

    setIsVerifyingOTP(true);

    try {
      // Verify OTP
      const otpResponse = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingLoginData.email,
          otp: otp,
        }),
      });

      const otpData = await otpResponse.json();

      if (otpResponse.ok) {
        // OTP verified, now complete login with session creation
        const loginResponse = await fetch("/api/users/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: pendingLoginData.identifier,
            password: pendingLoginData.password,
            skipSession: false, // Create session this time
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Validate the new session data
          const isValidSession = validateSessionData(loginData.user);

          if (isValidSession) {
            setMessage({
              type: "success",
              text: "Login successful! Redirecting to dashboard...",
            });

            setShowOTPModal(false);
            setPendingLoginData(null);
            setRemainingAttempts(null);
            setIsRateLimited(false);

            setTimeout(() => {
              router.push("/robofly-admin/dashboard");
            }, 1000);
            return true;
          } else {
            setMessage({
              type: "error",
              text: "Login successful but session data is incomplete. Please contact administrator.",
            });
            return false;
          }
        } else {
          setMessage({
            type: "error",
            text:
              loginData.error ||
              "Failed to complete login after OTP verification.",
          });
          return false;
        }
      } else {
        setMessage({
          type: "error",
          text: otpData.error || "Invalid OTP. Please try again.",
        });
        return false;
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage({
        type: "error",
        text: "An error occurred during OTP verification. Please try again.",
      });
      return false;
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  // Handle OTP resend
  const handleOTPResend = async (): Promise<boolean> => {
    if (!pendingLoginData) return false;

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingLoginData.email,
          name: pendingLoginData.username,
          purpose: "login",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "New OTP sent to your email.",
        });
        return true;
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to resend OTP. Please try again.",
        });
        return false;
      }
    } catch (error) {
      console.error("OTP resend error:", error);
      setMessage({
        type: "error",
        text: "An error occurred while resending OTP. Please try again.",
      });
      return false;
    }
  };

  // Handle OTP modal close
  const handleOTPModalClose = () => {
    setShowOTPModal(false);
    setPendingLoginData(null);
    if (!isRateLimited) {
      setMessage(null);
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
          <div className="mx-auto h-20 w-20 flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
            <Image
              src="/images/robofly.png"
              alt="Robofly Logo"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Robofly Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the dashboard
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : message.type === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : message.type === "warning"
                ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            <p className="text-sm font-medium">{message.text}</p>
          </motion.div>
        )}

        {/* Rate Limit Info */}
        {remainingAttempts !== null &&
          remainingAttempts <= 2 &&
          !isRateLimited && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-md bg-orange-50 border border-orange-200"
            >
              <p className="text-sm text-orange-800">
                ⚠️ Warning: {remainingAttempts} attempt(s) remaining before
                temporary lockout
              </p>
            </motion.div>
          )}

        {/* Login Form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                  disabled={isRateLimited}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                    isRateLimited ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
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
                  disabled={isRateLimited}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                    isRateLimited ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formSubmitting || isRateLimited}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                  formSubmitting || isRateLimited
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {formSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                ) : isRateLimited ? (
                  "Rate Limited - Please Wait"
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

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={handleOTPModalClose}
        onVerify={handleOTPVerify}
        email={pendingLoginData?.email || ""}
        onResendOTP={handleOTPResend}
        isVerifying={isVerifyingOTP}
      />
    </div>
  );
}
