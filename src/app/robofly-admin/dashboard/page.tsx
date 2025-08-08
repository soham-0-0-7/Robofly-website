"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import Image from "next/image";

interface UserSession {
  id: number;
  username: string;
  email: string;
  permissions: {
    user?: {
      readUser?: boolean;
      createUser?: boolean;
      updateUserPassword?: boolean;
      retrieveUserPassword?: boolean;
      deleteUser?: boolean;
      updateUserPermissions?: boolean;
    };
    product?: {
      readProducts?: boolean;
      addProducts?: boolean;
      updateProducts?: boolean;
      deleteProducts?: boolean;
    };
    service?: {
      readServices?: boolean;
      addServices?: boolean;
      updateServices?: boolean;
      deleteServices?: boolean;
    };
    blog?: {
      readBlogs?: boolean;
      addBlogs?: boolean;
      updateBlogs?: boolean;
      deleteBlogs?: boolean;
    };
    query?: {
      readQueries?: boolean;
      deleteQueries?: boolean;
      // updateQueries?: boolean;
      updateQueryStatus?: boolean;
    };
    log?: {
      readLogs?: boolean;
      deleteLogs?: boolean;
    };
  };
}

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  permissions: Record<string, any>;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  mainImage: string;
}

interface ServiceData {
  id: number;
  title: string;
  description: string;
  mainImage: string;
}

interface BlogData {
  id: number;
  title: string;
  image: string;
  bodyContent: string;
}

interface LogData {
  id: string;
  username: string;
  change: string;
  createdAt: string;
}
interface QueryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  querytype: string;
  status: string;
  data: any;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [productData, setProductData] = useState<ProductData[] | null>(null);
  const [serviceData, setServiceData] = useState<ServiceData[] | null>(null);
  const [blogData, setBlogData] = useState<BlogData[] | null>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [logData, setLogData] = useState<LogData[] | null>(null);
  const [queryData, setQueryData] = useState<QueryData[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const response = await fetch("/api/users/session");
        const data = await response.json();
        console.log("Session response:", data);

        if (!response.ok) {
          console.error("Session check failed with status:", response.status);
          setSessionError(
            `Session check failed: ${data.error || response.statusText}`
          );
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!data.authenticated) {
          console.error("Not authenticated");
          setSessionError("Your session has expired. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        if (!data.user) {
          console.error("No user data in session");
          setSessionError("Invalid session data. Redirecting to login...");
          setTimeout(() => router.push("/robofly-admin"), 2000);
          return;
        }

        console.log("Setting user from session:", data.user);
        setUser(data.user);
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

  const handleQueryTab = async () => {
    if (activeTab === "queries") {
      setActiveTab(null);
      return;
    }

    setActiveTab("queries");
    setTableLoading(true);

    try {
      const response = await fetch("/api/query/getAll");
      const data = await response.json();

      if (response.ok) {
        setQueryData(data.queries);
      } else {
        console.error("Failed to fetch queries:", data.error);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleDeleteQuery = async (queryId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete query with ID ${queryId}?`
      )
    ) {
      try {
        const response = await fetch(`/api/query/delete/${queryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setQueryData((prevData) =>
            prevData ? prevData.filter((query) => query.id !== queryId) : null
          );
          alert(`Query with ID ${queryId} has been deleted successfully.`);
        } else {
          alert(`Failed to delete query: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting query:", error);
        alert("Failed to delete query. Please try again.");
      }
    }
  };

  // Add this function around line 260, after handleUpdateQueryStatus
  const handleViewQueryData = (queryId: string) => {
    router.push(`/robofly-admin/dashboard/viewQueryData/${queryId}`);
  };

  const handleUpdateQueryStatus = async (
    queryId: string,
    currentStatus: string
  ) => {
    const newStatus = window.prompt(
      `Update status for query ${queryId}.\nCurrent status: ${currentStatus}\nEnter new status:`,
      currentStatus
    );

    if (!newStatus || newStatus === currentStatus) {
      return; // User cancelled or no change
    }

    try {
      const response = await fetch(`/api/query/updateStatus/${queryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          requestedBy: user?.username,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setQueryData((prevData) =>
          prevData
            ? prevData.map((query) =>
                query.id === queryId ? { ...query, status: newStatus } : query
              )
            : null
        );
        alert(`Query status updated successfully.`);
      } else {
        alert(`Failed to update query status: ${data.error}`);
      }
    } catch (error) {
      console.error("Error updating query status:", error);
      alert("Failed to update query status. Please try again.");
    }
  };

  const handleDeleteLog = async (logId: string) => {
    if (window.confirm(`Are you sure you want to delete this log?`)) {
      try {
        const response = await fetch(`/api/logs/delete/${logId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLogData((prevData) =>
            prevData ? prevData.filter((log) => log.id !== logId) : null
          );
          alert(`Log has been deleted successfully.`);
        } else {
          alert(`Failed to delete log: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting log:", error);
        alert("Failed to delete log. Please try again.");
      }
    }
  };

  const handleLogTab = async () => {
    if (activeTab === "logs") {
      setActiveTab(null);
      return;
    }

    setActiveTab("logs");
    setTableLoading(true);

    try {
      const response = await fetch("/api/logs/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestedBy: user?.username,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setLogData(data.logs);
      } else {
        console.error("Failed to fetch logs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleUserTab = async () => {
    if (activeTab === "users") {
      setActiveTab(null);
      return;
    }

    setActiveTab("users");
    setTableLoading(true);

    try {
      const response = await fetch("/api/users/getAll");
      const data = await response.json();

      if (response.ok) {
        setUserData(data.users);
      } else {
        console.error("Failed to fetch users:", data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleProductTab = async () => {
    if (activeTab === "products") {
      setActiveTab(null);
      return;
    }

    setActiveTab("products");
    setTableLoading(true);

    try {
      const response = await fetch("/api/products/getAll");
      const data = await response.json();

      if (response.ok) {
        setProductData(data.products);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleServiceTab = async () => {
    if (activeTab === "services") {
      setActiveTab(null);
      return;
    }

    setActiveTab("services");
    setTableLoading(true);

    try {
      const response = await fetch("/api/services/getAll");
      const data = await response.json();

      if (response.ok) {
        setServiceData(data.services);
      } else {
        console.error("Failed to fetch services:", data.error);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleBlogTab = async () => {
    if (activeTab === "blogs") {
      setActiveTab(null);
      return;
    }

    setActiveTab("blogs");
    setTableLoading(true);

    try {
      const response = await fetch("/api/blogs/getAll");
      const data = await response.json();

      if (response.ok) {
        setBlogData(data.blogs);
      } else {
        console.error("Failed to fetch blogs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (
      window.confirm(`Are you sure you want to delete user with ID ${userId}?`)
    ) {
      try {
        const response = await fetch(`/api/users/delete/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setUserData((prevData) =>
            prevData ? prevData.filter((user) => user.id !== userId) : null
          );
          alert(`User with ID ${userId} has been deleted successfully.`);
        } else {
          alert(`Failed to delete user: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleUpdatePassword = async (userId: number) => {
    const newPassword = window.prompt("Enter new password:");

    if (newPassword) {
      try {
        const response = await fetch(`/api/users/updatePassword/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPassword,
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(
            `Password for user with ID ${userId} has been updated successfully.`
          );
        } else {
          alert(`Failed to update password: ${data.error}`);
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      }
    }
  };

  const handleRetrievePassword = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/retrievePassword/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestedBy: user?.username,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `Please note down the user with ID ${userId}'s password: ${data.password}`
        );
      } else {
        alert(`Failed to retrieve password: ${data.error}`);
      }
    } catch (error) {
      console.error("Error retrieving password:", error);
      alert("Failed to retrieve password. Please try again.");
    }
  };

  // Add these around line 405, after handleUpdatePermissions
  const handleCreateProduct = () => {
    router.push("/robofly-admin/dashboard/createProduct");
  };

  const handleCreateService = () => {
    router.push("/robofly-admin/dashboard/createService");
  };

  const handleUpdateProduct = (productId: number) => {
    router.push(`/robofly-admin/dashboard/updateProduct/${productId}`);
  };

  const handleUpdateService = (serviceId: number) => {
    router.push(`/robofly-admin/dashboard/updateService/${serviceId}`);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete product with ID ${productId}?`
      )
    ) {
      try {
        const response = await fetch(`/api/products/delete/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setProductData((prevData) =>
            prevData
              ? prevData.filter((product) => product.id !== productId)
              : null
          );
          alert(`Product with ID ${productId} has been deleted successfully.`);
        } else {
          alert(`Failed to delete product: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete service with ID ${serviceId}?`
      )
    ) {
      try {
        const response = await fetch(`/api/services/delete/${serviceId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setServiceData((prevData) =>
            prevData
              ? prevData.filter((service) => service.id !== serviceId)
              : null
          );
          alert(`Service with ID ${serviceId} has been deleted successfully.`);
        } else {
          alert(`Failed to delete service: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service. Please try again.");
      }
    }
  };

  // Add around line 470, after handleDeleteService
  const handleCreateBlog = () => {
    router.push("/robofly-admin/dashboard/createBlog");
  };

  const handleUpdateBlog = (blogId: number) => {
    router.push(`/robofly-admin/dashboard/updateBlog/${blogId}`);
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (
      window.confirm(`Are you sure you want to delete blog with ID ${blogId}?`)
    ) {
      try {
        const response = await fetch(`/api/blogs/delete/${blogId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy: user?.username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setBlogData((prevData) =>
            prevData ? prevData.filter((blog) => blog.id !== blogId) : null
          );
          alert(`Blog with ID ${blogId} has been deleted successfully.`);
        } else {
          alert(`Failed to delete blog: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  const handleUpdatePermissions = (userId: number) => {
    router.push(`/robofly-admin/dashboard/updateUserPermissions/${userId}`);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      router.push("/robofly-admin");
    }
  };

  const hasPermission = (permissionPath: string): boolean => {
    if (!user || !user.permissions) return false;

    const parts = permissionPath.split(".");

    if (parts.length !== 2) return false;

    const [category, action] = parts;

    return !!(user.permissions as Record<string, any>)[category]?.[action];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Loading dashboard..." />
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-2">User session data not available</p>
          <button
            onClick={() => router.push("/robofly-admin")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </button>
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
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          className="px-4 py-6 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Dashboard Navigation
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Select a section to manage your website content
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hasPermission("user.readUser") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUserTab}
                  className={`p-4 rounded-lg shadow-sm border ${
                    activeTab === "users"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  } transition-colors flex flex-col items-center`}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">Users</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Manage system users
                  </span>
                </motion.button>
              )}
              {hasPermission("product.readProducts") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProductTab}
                  className={`p-4 rounded-lg shadow-sm border ${
                    activeTab === "products"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  } transition-colors flex flex-col items-center`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">Products</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Manage product listings
                  </span>
                </motion.button>
              )}
              {hasPermission("service.readServices") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleServiceTab}
                  className={`p-4 rounded-lg shadow-sm border ${
                    activeTab === "services"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  } transition-colors flex flex-col items-center`}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">Services</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Manage service offerings
                  </span>
                </motion.button>
              )}
              {hasPermission("blog.readBlogs") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBlogTab}
                  className={`p-4 rounded-lg shadow-sm border ${
                    activeTab === "blogs"
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  } transition-colors flex flex-col items-center`}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">Blogs</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Manage blog articles
                  </span>
                </motion.button>
              )}
              {hasPermission("query.readQueries") && (
                <button
                  onClick={handleQueryTab}
                  className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 ${
                    activeTab === "queries"
                      ? "bg-indigo-100 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                  aria-current={activeTab === "queries" ? "page" : undefined}
                >
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center w-full mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex items-center flex-1">
                        <span className="font-medium text-gray-900">
                          Queries
                        </span>
                        {queryData && (
                          <span className="ml-2 bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full text-xs font-medium">
                            {queryData.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 ml-8">
                      Manage client queries
                    </div>
                  </div>
                </button>
              )}
              {hasPermission("log.readLogs") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogTab}
                  className={`p-4 rounded-lg shadow-sm border ${
                    activeTab === "logs"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  } transition-colors flex flex-col items-center`}
                >
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">Logs</span>
                  <span className="text-xs text-gray-500 mt-1">
                    View system activity logs
                  </span>
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab && tableLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12"
              >
                <LoadingSpinner text={`Loading ${activeTab} data...`} />
              </motion.div>
            )}

            {activeTab === "users" && !tableLoading && userData && (
              <motion.div
                key="users-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Users Management
                    </h3>
                    {hasPermission("user.createUser") && (
                      <button
                        onClick={() =>
                          router.push("/robofly-admin/dashboard/createUser")
                        }
                        className="ml-4 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create User
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: {userData.length} users
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Permissions
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="grid grid-cols-2 gap-1">
                              {Object.entries(user.permissions).flatMap(
                                ([category, permissions]) =>
                                  typeof permissions === "object"
                                    ? Object.entries(permissions).map(
                                        ([permission, value]) => (
                                          <div
                                            key={`${category}.${permission}`}
                                            className="flex items-center"
                                          >
                                            <div
                                              className={`w-2 h-2 rounded-full mr-1 ${
                                                value
                                                  ? "bg-green-500"
                                                  : "bg-red-500"
                                              }`}
                                            ></div>
                                            <span className="text-xs truncate">
                                              {category}.{permission}
                                            </span>
                                          </div>
                                        )
                                      )
                                    : []
                              )}
                            </div>
                          </td>
                         
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  <div className="flex space-x-2">
    {hasPermission("user.updateUserPermissions") && user.id !== 1 && (
      <button
        onClick={() => handleUpdatePermissions(user.id)}
        className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
        title="Update Permissions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </button>
    )}

    {hasPermission("user.updateUserPassword") && (
      <button
        onClick={() => handleUpdatePassword(user.id)}
        className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
        title="Update Password"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    )}

    {hasPermission("user.retrieveUserPassword") && (
      <button
        onClick={() => handleRetrievePassword(user.id)}
        className="px-2 py-1 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors"
        title="Retrieve Password"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </button>
    )}

    {hasPermission("user.deleteUser") && user.id !== 1 && (
      <button
        onClick={() => handleDeleteUser(user.id)}
        className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
        title="Delete User"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    )}
  </div>
</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && !tableLoading && productData && (
              <motion.div
                key="products-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Products Management
                  </h3>
                  <span className="text-sm text-gray-600">
                    Total: {productData.length} products
                  </span>
                </div>
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Products Management
                    </h3>
                    {hasPermission("product.addProducts") && (
                      <button
                        onClick={handleCreateProduct}
                        className="ml-4 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Product
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: {productData.length} products
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Image ID
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productData.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {product.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                            {product.mainImage}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              {hasPermission("product.updateProducts") && (
                                <button
                                  onClick={() =>
                                    handleUpdateProduct(product.id)
                                  }
                                  className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                  title="Update Product"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              )}
                              {hasPermission("product.deleteProducts") && (
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                  className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                  title="Delete Product"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "services" && !tableLoading && serviceData && (
              <motion.div
                key="services-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Services Management
                    </h3>
                    {hasPermission("service.addServices") && (
                      <button
                        onClick={handleCreateService}
                        className="ml-4 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Service
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: {serviceData.length} services
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Image ID
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {serviceData.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {service.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {service.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {service.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                            {service.mainImage}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              {hasPermission("service.updateServices") && (
                                <button
                                  onClick={() =>
                                    handleUpdateService(service.id)
                                  }
                                  className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                                  title="Update Service"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              )}
                              {hasPermission("service.deleteServices") && (
                                <button
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                  className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                  title="Delete Service"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "blogs" && !tableLoading && blogData && (
              <motion.div
                key="blogs-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Blogs Management
                    </h3>
                    {hasPermission("blog.addBlogs") && (
                      <button
                        onClick={handleCreateBlog}
                        className="ml-4 px-3 py-1.5 bg-amber-600 text-white text-sm font-medium rounded hover:bg-amber-700 transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Blog
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: {blogData.length} blogs
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Image ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Body HTML
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogData.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {blog.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                            {blog.image}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="max-h-24 overflow-y-auto max-w-md">
                              <code className="text-xs whitespace-pre-wrap">
                                {blog.bodyContent.length > 200
                                  ? blog.bodyContent.substring(0, 200) + "..."
                                  : blog.bodyContent}
                              </code>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              {hasPermission("blog.updateBlogs") && (
                                <button
                                  onClick={() => handleUpdateBlog(blog.id)}
                                  className="px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded hover:bg-amber-700 transition-colors"
                                  title="Update Blog"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              )}
                              {hasPermission("blog.deleteBlogs") && (
                                <button
                                  onClick={() => handleDeleteBlog(blog.id)}
                                  className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                  title="Delete Blog"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "queries" && !tableLoading && queryData && (
              <motion.div
                key="queries-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Query Management
                  </h3>
                  <span className="text-sm text-gray-600">
                    Total: {queryData.length} queries
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {queryData.map((query) => (
                        <tr key={query.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {query.id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.querytype}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                query.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : query.status === "completed" ||
                                    query.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : query.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {query.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(query.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewQueryData(query.id)}
                                className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                title="View Data"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              {hasPermission("query.updateQueryStatus") && (
                                <button
                                  onClick={() =>
                                    handleUpdateQueryStatus(
                                      query.id,
                                      query.status
                                    )
                                  }
                                  className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 transition-colors"
                                  title="Update Status"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                                    />
                                  </svg>
                                </button>
                              )}
                              {hasPermission("query.deleteQueries") && (
                                <button
                                  onClick={() => handleDeleteQuery(query.id)}
                                  className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                  title="Delete Query"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "logs" && !tableLoading && logData && (
              <motion.div
                key="logs-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    System Logs
                  </h3>
                  <span className="text-sm text-gray-600">
                    Total: {logData.length} logs
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {logData.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.username}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.change}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              {hasPermission("log.deleteLogs") && (
                                <button
                                  onClick={() => handleDeleteLog(log.id)}
                                  className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                  title="Delete Log"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
