"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function CallIconWithWaves() {
  return (
    <div className="relative flex items-center justify-center mb-6 w-full pt-8">
      {/* Wavy Background */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none pt-8">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
          <path
            fill="none"
            stroke="#86efac"
            strokeWidth="4"
            strokeLinecap="round"
            d="M0,100 Q250,0 500,100 T1000,100"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="M0,100 Q250,0 500,100 T1000,100;
                      M0,100 Q250,200 500,100 T1000,100;
                      M0,100 Q250,0 500,100 T1000,100"
            />
          </path>
          <path
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="2.5"
            strokeLinecap="round"
            d="M0,120 Q250,30 500,120 T1000,120"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M0,120 Q250,30 500,120 T1000,120;
                      M0,120 Q250,210 500,120 T1000,120;
                      M0,120 Q250,30 500,120 T1000,120"
            />
          </path>
          <path
            fill="none"
            stroke="#a7f3d0"
            strokeWidth="5"
            strokeLinecap="round"
            d="M0,80 Q250,180 500,80 T1000,80"
          >
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M0,80 Q250,180 500,80 T1000,80;
                      M0,80 Q250,20 500,80 T1000,80;
                      M0,80 Q250,180 500,80 T1000,80"
            />
          </path>
        </svg>
      </motion.div>

      {/* Call Icon */}
      <motion.div
        className="z-10 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 10px rgba(74, 222, 128, 0.5)",
            "0 0 15px rgba(74, 222, 128, 0.8)",
            "0 0 10px rgba(74, 222, 128, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          scale: 1.15,
          x: [0, -2, 2, -2, 2, 0],
          y: [0, 2, -2, 2, -2, 0],
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <PhoneCall className="text-white w-10 h-10" />
      </motion.div>
    </div>
  );
}
