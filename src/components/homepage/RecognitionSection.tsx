"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { colorPalette } from "@/utils/variables";

export default function RecognitionSection() {
  const recognizedBy = [
    { src: "/images/Recognition_Support/meity.png", alt: "MeitY" },
    { src: "/images/Recognition_Support/EAI.png", alt: "EAI" },
    { src: "/images/Recognition_Support/dpiit.png", alt: "DPIIT" },
    {
      src: "/images/Recognition_Support/startup bihar.png",
      alt: "Startup Bihar",
    },
  ];

  const supportedBy = [
    {
      src: "/images/Recognition_Support/aic bansthali.jpeg.jpg",
      alt: "AIC Banasthali",
    },
    {
      src: "/images/Recognition_Support/iit mandi.png",
      alt: "IIT Mandi Catalyst",
    },
  ];

  const recognitionRef = useRef(null);
  const supportRef = useRef(null);
  const recognitionInView = useInView(recognitionRef, { margin: "-100px" });
  const supportInView = useInView(supportRef, { margin: "-100px" });
  const recognitionControls = useAnimation();
  const supportControls = useAnimation();

  useEffect(() => {
    if (recognitionInView) {
      recognitionControls.start("visible");
    } else {
      recognitionControls.start("exit");
    }
  }, [recognitionInView, recognitionControls]);

  useEffect(() => {
    if (supportInView) {
      supportControls.start("visible");
    } else {
      supportControls.start("exit");
    }
  }, [supportInView, supportControls]);

  const recognitionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
        delay: i * 0.1,
      },
    }),
    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } },
  };

  const supportVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
        delay: i * 0.1,
      },
    }),
    exit: { opacity: 0, x: 100, transition: { duration: 0.4 } },
  };

  return (
    <section
      className="py-6 sm:py-8 px-4 text-center border-t-2 border-b-2"
      style={{
        background: colorPalette.aboutBg,
        borderColor: colorPalette.green4,
      }}
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-6 font-heading"
        style={{ color: colorPalette.aboutText }}
      >
        Recognized by
      </motion.h2>

      {/* Recognized Logos */}
      <div
        ref={recognitionRef}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10"
      >
        {recognizedBy.map((logo, i) => {
          const isLastOdd =
            recognizedBy.length % 3 === 1 && i === recognizedBy.length - 1;
          return (
            <motion.div
              key={logo.alt}
              custom={i}
              variants={recognitionVariants}
              initial="hidden"
              animate={recognitionControls}
              whileHover={{ scale: 1.04 }}
              className={`flex justify-center items-center p-3 rounded-lg bg-white shadow-sm border ${
                isLastOdd ? "sm:col-start-2" : ""
              }`}
              style={{ boxShadow: `0 2px 8px ${colorPalette.green4}33` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={45}
                className="object-contain h-12 w-auto"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Supported By */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-6 font-heading"
        style={{ color: colorPalette.aboutText }}
      >
        Supported by
      </motion.h2>

      {/* Supported Logos */}
      <div ref={supportRef} className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
        {supportedBy.map((logo, i) => (
          <motion.div
            key={logo.alt}
            custom={i}
            variants={supportVariants}
            initial="hidden"
            animate={supportControls}
            whileHover={{ scale: 1.06 }}
            className="flex justify-center items-center p-3 rounded-lg bg-white shadow-sm border"
            style={{ boxShadow: `0 2px 8px ${colorPalette.green4}33` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={90}
              height={45}
              className="object-contain h-12 w-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
