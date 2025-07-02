"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CallIconWithWaves from "./CallIconWithWaves";
import ContactTextContent from "./ContactTextContent";

export default function CallingAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const mobileExtraParticles = [
    { top: "60%", left: "15%", bg: "rgba(80,200,120,0.45)", delay: 0.8 },
    { top: "55%", left: "30%", bg: "rgba(64,224,208,0.4)", delay: 1.2 },
    { top: "73%", left: "70%", bg: "rgba(0,255,127,0.5)", delay: 1.1 },
    { top: "66%", left: "85%", bg: "rgba(102,255,178,0.4)", delay: 0.9 },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full p-0 flex justify-center items-center"
    >
      <div className="p-2.5 w-full max-w-7xl border-4 border-emerald-600 rounded-2xl">
        <motion.div
          className="relative w-full h-auto bg-gray-900 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md border border-green-400/30"
          whileTap={{ scale: 1 }}
          transition={{
            scale: { duration: 0.4, ease: "easeOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          animate={{
            boxShadow: [
              "0 4px 20px rgba(74, 222, 128, 0.1)",
              "0 8px 30px rgba(74, 222, 128, 0.2)",
              "0 4px 20px rgba(74, 222, 128, 0.1)",
            ],
          }}
        >
          <CallIconWithWaves />
          <ContactTextContent />

          {/* Mobile-Only Extra Particles (center-bottom zone) */}
          {isMobile &&
            mobileExtraParticles.map((p, i) => (
              <motion.div
                key={`mobile-particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: p.top,
                  left: p.left,
                  backgroundColor: p.bg,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2.5,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Existing Particle Animations (you already have these) */}
          {/* You can keep your previous particle code here as-is */}
          {/* Reduced Floating Particles (Visually uneven) */}
          {/* Floating Particles */}
          <motion.div
            className="absolute top-8 right-8 w-2 h-2 bg-green-400/50 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-green-300/40 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
          <motion.div
            className="absolute top-20 left-12 w-1 h-1 bg-blue-400/60 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-10 left-1/2 w-2 h-2 bg-emerald-300/70 rounded-full"
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            }}
          />
          <motion.div
            className="absolute bottom-10 right-1/2 w-1.5 h-1.5 bg-emerald-400/60 rounded-full"
            animate={{
              y: [0, -18, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          {/* 10 Additional Particles */}
          <motion.div
            className="absolute top-4 left-1/3 w-1 h-1 bg-green-300/50 rounded-full"
            animate={{
              y: [0, -14, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.1,
            }}
          />
          <motion.div
            className="absolute bottom-6 right-10 w-2 h-2 bg-green-500/40 rounded-full"
            animate={{
              y: [0, -16, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.7,
            }}
          />
          <motion.div
            className="absolute top-24 left-1/4 w-1.5 h-1.5 bg-blue-300/50 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.3,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-16 w-2 h-2 bg-emerald-500/50 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/5 w-1 h-1 bg-green-200/50 rounded-full"
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6,
            }}
          />
          <motion.div
            className="absolute top-6 right-1/4 w-2 h-2 bg-emerald-400/40 rounded-full"
            animate={{
              y: [0, -18, 0],
              opacity: [0.5, 0.85, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
          />
          <motion.div
            className="absolute top-32 right-8 w-1 h-1 bg-green-300/30 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.2,
            }}
          />
          <motion.div
            className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-blue-200/40 rounded-full"
            animate={{
              y: [0, -14, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {[
            // { top: 204, left: "55.92%", bg: "rgba(157,200,110,0.56)", y: -11.7, scale: 1.27, delay: 1.43, duration: 2.85 },
            {
              top: 310,
              left: "58.46%",
              bg: "rgba(90,227,192,0.54)",
              y: -13.5,
              scale: 1.15,
              delay: 0.78,
              duration: 2.96,
            },
            // { top: 321, left: "80.60%", bg: "rgba(108,213,188,0.5)", y: -11.7, scale: 1.22, delay: 1.56, duration: 2.5 },
            {
              top: 340,
              left: "28.51%",
              bg: "rgba(104,204,110,0.46)",
              y: -13.5,
              scale: 1.21,
              delay: 1.94,
              duration: 2.67,
            },
            //{ top: 375, left: "53.94%", bg: "rgba(154,194,136,0.6)", y: -10.9, scale: 1.13, delay: 1.02, duration: 2.68 },
            // { top: 407, left: "13.90%", bg: "rgba(113,203,121,0.6)", y: -13.9, scale: 1.22, delay: 0.9, duration: 2.75 },
            {
              top: 422,
              left: "67.37%",
              bg: "rgba(138,197,167,0.58)",
              y: -11.1,
              scale: 1.28,
              delay: 1.47,
              duration: 2.85,
            },
            {
              top: 467,
              left: "34.63%",
              bg: "rgba(128,219,191,0.46)",
              y: -13.8,
              scale: 1.17,
              delay: 1.31,
              duration: 2.49,
            },
            // { top: 492, left: "58.99%", bg: "rgba(119,217,118,0.54)", y: -17.0, scale: 1.12, delay: 0.56, duration: 3.01 },
            {
              top: 504,
              left: "10.64%",
              bg: "rgba(152,217,141,0.51)",
              y: -18.8,
              scale: 1.14,
              delay: 0.92,
              duration: 2.41,
            },
            // { top: 566, left: "22.55%", bg: "rgba(91,201,135,0.48)", y: -13.8, scale: 1.25, delay: 1.57, duration: 2.97 },
            //{ top: 408, left: "25.91%", bg: "rgba(156,227,126,0.46)", y: -14.1, scale: 1.17, delay: 1.36, duration: 2.94 },
          ].map((p, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${p.top}px`,
                left: p.left,
                backgroundColor: p.bg,
                width: "0.5rem",
                height: "0.5rem",
              }}
              animate={{
                y: [0, p.y, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, p.scale, 1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
