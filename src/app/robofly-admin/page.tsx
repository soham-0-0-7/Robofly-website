"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { colorPalette } from "@/utils/variables";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    identifier: "", // Can be username or email
    password: "",
  });
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Success - redirect to dashboard
      router.push("/robofly-admin/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{
            background: `radial-gradient(${colorPalette.green3}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(${colorPalette.green4}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full opacity-30"
          style={{ background: colorPalette.green2 }}
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full opacity-20"
          style={{ background: colorPalette.green3 }}
          animate={{
            y: [0, -70, 0],
            x: [0, -30, 0],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <motion.div
        className="bg-white p-10 rounded-2xl shadow-xl z-10 w-full max-w-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="p-3 shadow-lg bg-white">
            <div className="w-20 h-20 relative">
              <Image
                src="/images/robofly.png"
                alt="Robofly Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <motion.h1
            className="text-2xl font-bold text-center mb-1"
            variants={itemVariants}
          >
            <span style={{ color: colorPalette.green3 }}>ROBOFLY</span>{" "}
            <span style={{ color: colorPalette.blackMuted }}>ADMIN</span>
          </motion.h1>
          <motion.p
            className="text-gray-600 text-center mb-6"
            variants={itemVariants}
          >
            Enter your credentials to access the dashboard
          </motion.p>

          <form onSubmit={handleSubmit}>
            <motion.div className="mb-4" variants={itemVariants}>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="identifier"
              >
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={credentials.identifier}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                placeholder="Enter your username or email"
              />
            </motion.div>

            <motion.div className="mb-6" variants={itemVariants}>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                placeholder="Enter your password"
              />
            </motion.div>

            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md font-medium text-white transition-all duration-300 flex items-center justify-center"
                style={{
                  background: `linear-gradient(90deg, ${colorPalette.green3} 0%, ${colorPalette.green4} 100%)`,
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
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
                    Authenticating...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </motion.div>
          </form>

          <motion.p
            className="text-xs text-center mt-6 text-gray-500"
            variants={itemVariants}
          >
            For password recovery, please contact the system administrator
          </motion.p>
        </motion.div>

        {/* Drone animation */}
        <motion.div
          className="absolute -bottom-6 right-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-4 bg-green-600 rounded-lg relative"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute -top-1 -left-3 w-2 h-2 bg-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -top-1 -right-3 w-2 h-2 bg-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-3 w-2 h-2 bg-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-3 w-2 h-2 bg-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
