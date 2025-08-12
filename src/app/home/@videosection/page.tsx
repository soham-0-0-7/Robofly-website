"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { videoSrc } from "@/utils/variables";
import ContactButton from "@/components/global/ContactButton";

export default function VideoSection() {
  const endRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Centered Text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-3xl md:text-5xl font-bold max-w-3xl"
        >
          India&apos;s Future Leader in Advanced Drone Solutions and Impact
        </motion.h1>

        {/* Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-8 flex flex-col md:flex-row gap-4"
        >
          {/* Explore Button with white styling */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
            disabled={false}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f1f1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
            className={`inline-flex items-center justify-center gap-2 font-medium text-black transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none rounded-lg px-6 py-3 text-base`}
            style={{ backgroundColor: "#ffffff" }}
          >
            Explore
          </motion.button>

          {/* Contact Us Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ContactButton />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Target */}
      <div ref={endRef} className="w-full h-1" />
    </section>
  );
}
