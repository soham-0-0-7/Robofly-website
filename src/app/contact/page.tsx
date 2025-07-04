'use client';

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
    </div>
  );
}
