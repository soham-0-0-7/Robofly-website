"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ContactFormsSlider from "@/components/contact/ContactFormsSlider";
import CallingAnimation from "@/components/contact/CallingAnimation";
import { colorPalette } from "@/utils/variables";
import { useSearchParams } from "next/navigation";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideIn = (direction: "left" | "right") => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden relative -mb-36">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <motion.div
          className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background: `radial-gradient(${colorPalette.green3}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-64 -left-64 w-[900px] h-[900px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(${colorPalette.green4}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Heading and Animation */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          custom={0}
        >
          <CallingAnimation />
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          suppressHydrationWarning
          ref={formRef}
          className="w-full -mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={slideIn("left")}
        >
          <ContactFormsSlider type={type} id={id} />
        </motion.div>
      </div>

      {/* Subtle Center Pulse Animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-200 rounded-full opacity-20 pointer-events-none -mb-20"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{
          scale: [1, 20, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Floating Email */}
      <motion.div
        className="fixed right-6 bottom-6 z-20 flex flex-col gap-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.a
          href="mailto:arpana@roboflytech.com"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: colorPalette.green5,
            boxShadow: `0 4px 20px ${colorPalette.greenShadow}30`,
          }}
          aria-label="Email us"
          whileHover={{
            scale: 1.15,
            rotate: 5,
            boxShadow: `0 8px 30px ${colorPalette.greenShadow}40`,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </motion.svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
