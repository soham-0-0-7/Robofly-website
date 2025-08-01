import React from "react";
// import { motion } from "framer-motion";
// import { colorPalette } from "@/utils/variables";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (
  {
    //   text = "Loading...",
  }
) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
};

export default LoadingSpinner;
