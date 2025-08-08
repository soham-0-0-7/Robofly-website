"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import Image from "next/image";

interface QueryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  querytype: string;
  status: string;
  data: Record<string, any>;
  createdAt: string;
}

export default function ViewQueryDataPage() {
  const router = useRouter();
  const params = useParams();
  const queryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [queryData, setQueryData] = useState<QueryData | null>(null);

  useEffect(() => {
    const checkSessionAndFetchQuery = async () => {
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

        if (!sessionData.user.permissions?.query?.readQueries) {
          setSessionError(
            "You don't have permission to view query details. Redirecting to dashboard..."
          );
          setTimeout(() => router.push("/robofly-admin/dashboard"), 2000);
          return;
        }

        const queryResponse = await fetch(`/api/query/getById/${queryId}`);
        const queryResult = await queryResponse.json();

        if (!queryResponse.ok) {
          setSessionError(`Failed to fetch query data: ${queryResult.error}`);
          setTimeout(() => router.push("/robofly-admin/dashboard"), 2000);
          return;
        }

        setQueryData(queryResult.query);
      } catch (error) {
        console.error("Error:", error);
        setSessionError(
          "Failed to verify your session or fetch query data. Redirecting to login..."
        );
        setTimeout(() => router.push("/robofly-admin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (queryId) {
      checkSessionAndFetchQuery();
    }
  }, [queryId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Loading query data..." />
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

  if (!queryData) {
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
          <h2 className="text-xl font-semibold text-center mb-2">Error</h2>
          <p className="text-gray-600 text-center mb-4">
            Query data not found.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/robofly-admin/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
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
              <span style={{ color: colorPalette.green3 }}>ROBOFLY</span>&nbsp;
              <span style={{ color: colorPalette.blackMuted }}>ADMIN</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Query Details
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

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
              <h3 className="text-lg font-medium text-gray-800">
                Query Information - ID: {queryData.id}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Type: {queryData.querytype} | Submitted:&nbsp;
                {new Date(queryData.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Basic Information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Name:
                      </span>
                      <p className="text-sm text-gray-800 break-words max-h-32 overflow-y-auto">
                        {queryData.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Email:
                      </span>
                      <p className="text-sm text-gray-800 break-words max-h-32 overflow-y-auto">
                        {queryData.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Phone:
                      </span>
                      <p className="text-sm text-gray-800 break-words max-h-32 overflow-y-auto">
                        {queryData.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Status:
                      </span>
                      <span
                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          queryData.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : queryData.status === "completed" ||
                              queryData.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : queryData.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {queryData.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Query Type Details
                  </h4>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Query Type:
                    </span>
                    <p className="text-sm text-gray-800 break-words max-h-32 overflow-y-auto">
                      {queryData.querytype}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-md font-medium text-gray-700 mb-4">
                  Additional Data
                </h4>
                {queryData.data && Object.keys(queryData.data).length > 0 ? (
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="max-h-96 overflow-auto">
                      &nbsp;
                      {/* Add this wrapper div for vertical scrolling */}
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                          {/* &nbsp;
                          Make header sticky */}
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Field
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Object.entries(queryData.data).map(
                            ([key, value]) => (
                              <tr key={key} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-700 max-w-[200px] break-words">
                                  {key}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {typeof value === "object" ? (
                                    <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded text-xs overflow-auto max-h-64 max-w-2xl">
                                      {JSON.stringify(value, null, 2)}
                                    </pre>
                                  ) : (
                                    <div className="max-h-64 overflow-y-auto max-w-2xl break-words">
                                      {String(value)}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No additional data available
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
