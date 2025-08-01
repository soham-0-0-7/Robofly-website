// Users\soham\OneDrive\Desktop\Robofly - internship\website\robofly-website\src\app\robofly-admin\dashboard\updateBlog\[id]\page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import Image from "next/image";

interface FormData {
  title: string;
  image: string;
  bodyContent: string;
}

export default function UpdateBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
    bodyContent: "",
  });

  useEffect(() => {
    const checkSessionAndFetchBlog = async () => {
      try {
        const sessionResponse = await fetch("/api/users/session");
        const sessionData = await sessionResponse.json();

        if (!sessionResponse.ok || !sessionData.authenticated) {
          setSessionError("You are not authenticated. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!sessionData.user) {
          setSessionError("Invalid session data. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!sessionData.user.permissions?.blog?.updateBlogs) {
          setSessionError(
            "You don't have permission to update blogs. Redirecting to dashboard..."
          );
          setTimeout(() => router.push("/robofly-admin/dashboard"), 2000);
          return;
        }

        const blogResponse = await fetch(`/api/blogs/getById?id=${blogId}`);
        const blogData = await blogResponse.json();

        if (!blogResponse.ok) {
          setSessionError(`Failed to fetch blog data: ${blogData.error}`);
          setTimeout(() => router.push("/robofly-admin/dashboard"), 2000);
          return;
        }

        setFormData({
          title: blogData.blog.title,
          image: blogData.blog.image,
          bodyContent: blogData.blog.bodyContent,
        });
      } catch (error) {
        console.error("Error:", error);
        setSessionError(
          "Failed to verify your session or fetch blog data. Redirecting to login..."
        );
        setTimeout(() => router.push("/robofly-admin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      checkSessionAndFetchBlog();
    }
  }, [blogId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setMessage(null);

    try {
      // Get current username for log
      const sessionResponse = await fetch("/api/users/session");
      const sessionData = await sessionResponse.json();
      const currentUsername = sessionData.user?.username || "unknown";

      const response = await fetch(`/api/blogs/update/${blogId}`, {
        method: "PUT",
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
        throw new Error(data.error || "Failed to update blog");
      }

      setMessage({
        type: "success",
        text: "Blog updated successfully!",
      });
    } catch (error) {
      console.error("Error updating blog:", error);
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
        <LoadingSpinner text="Loading blog data..." />
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
              Update Blog
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
            <div className="px-6 py-4 bg-amber-50 border-b">
              <h3 className="text-lg font-medium text-gray-800">
                Blog Information
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Update details for blog ID: {blogId}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image (Cloudinary ID)
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the Cloudinary image ID (e.g.,
                  &quot;robofly/blogs/blog-image-1&quot;) - Image must be hosted
                  on admin&nbsp;s cloudinary account, none other.
                </p>
                <p className="text-underlined text-blue-500">
                  <a
                    className=" text-blue-500"
                    href="https://drive.google.com/file/d/11DSoTALPyBf5e_5LO28QnLoAN9bRgPH-/view?usp=drive_link"
                  >
                    DEMO
                  </a>
                </p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bodyContent"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Main Body
                </label>
                <div className="bg-gray-50 p-3 rounded-md mb-2 text-xs text-gray-600">
                  <p className="font-semibold mb-1">Instructions:</p>
                  <p>
                    For main body use HTML code... &lt;br&gt;&lt;/br&gt; for new
                    lines and &nbsp; for more than one spaces.
                  </p>
                  <p className="mt-1">Or</p>
                  <p>
                    Write down the blog in a word file and then design it if you
                    want, then upload it to a gen AI and use the following
                    prompt:
                  </p>
                   <p className="italic mt-1">
                    &quot;For the attached blog, design a HTML code to display
                    it as a blog on my website, just give me the HTML snippet
                    for inside the body tag (don&apos;t include the opening and
                    closing body tag) and style it using Tailwind CSS (I already
                    have it set up) also keep in mind that there must be enough
                    line spacing and leaving of lines before and after new
                    paragraphs and headings.&quot;
                  </p>
                  <p className="mt-1">And then paste the code here.</p>
                  <p className="text-underlined text-blue-500">
                    <a
                      className=" text-blue-500"
                      href="https://drive.google.com/file/d/1H_MVObEyur0e_0dTcZ6gkbAZGzGevA_X/view?usp=drive_link"
                    >
                      DEMO
                    </a>
                  </p>
                </div>
                <textarea
                  id="bodyContent"
                  name="bodyContent"
                  value={formData.bodyContent}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className={`px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
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
                      Updating Blog...
                    </span>
                  ) : (
                    "Update Blog"
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