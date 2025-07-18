"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  TreePine,
  ShieldCheck,
  PackageCheck,
  Crosshair,
  BookOpenCheck,
} from "lucide-react";
import { colorPalette } from "@/utils/variables";

const applications = [
  {
    icon: Leaf,
    title: "Agriculture",
    description:
      "Advanced drone solutions for crop monitoring, NDVI analysis, yield prediction, plant health assessment, and precision spraying to help farmers make data-driven decisions and boost productivity.",
    points: [
      "Precision Spraying",
      "NDVI & Yield Analysis",
      "Plant Health Monitoring",
    ],
  },
  {
    icon: TreePine,
    title: "Forestry",
    description:
      "Support for forest health monitoring, illegal logging detection, and wildfire risk analysis using drones integrated with AI-driven aerial insights.",
    points: [
      "Forest Health Monitoring",
      "Illegal Logging Detection",
      "Wildfire Risk & Recovery Analysis",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Surveillance & Security",
    description:
      "High-endurance surveillance drones for border security, perimeter monitoring, crowd control, and facility inspections, enhancing awareness and rapid response.",
    points: [
      "Crowd Surveillance",
      "Rapid Situational Response",
      "Border & Facility Monitoring",
    ],
  },
  {
    icon: PackageCheck,
    title: "Logistics",
    description:
      "Drones developed for lightweight parcel delivery in difficult or remote areas, ideal for both civilian and defense logistics needs.",
    points: [
      "Last-Mile Delivery",
      "Parcel Dropping Drones",
      "Time-Sensitive Logistics",
    ],
  },
  {
    icon: Crosshair,
    title: "Defense & Tactical Operations",
    description:
      "Rugged drones for defense operations including reconnaissance, surveillance, and FPV-based tactical simulation with payload capabilities.",
    points: [
      "FPV Navigation & Bomb Drop",
      "Reconnaissance & Surveillance",
      "Mission-Specific Customization",
    ],
  },
  {
    icon: BookOpenCheck,
    title: "Training & Education",
    description:
      "Modular drones for hands-on training in universities and research institutes, focused on drone programming, assembly, and operation.",
    points: [
      "Flight Operations",
      "STEM Educational Use",
      "Drone Assembly Training",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// const textVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//     },
//   },
// };

const HomeApplications = () => {
  return (
    <motion.section
      className="py-16 sm:py-20 flex justify-center items-center overflow-hidden"
      style={{
        background: colorPalette.aboutBg,
        borderTop: `2px solid ${colorPalette.green4}`,
        borderBottom: `2px solid ${colorPalette.green4}`,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl w-full px-4">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-heading"
            style={{ color: colorPalette.aboutText }}
          >
            Application{" "}
            <span style={{ color: colorPalette.green5 }}>Areas</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg max-w-3xl mx-auto font-subheading"
            style={{ color: colorPalette.green3 }}
          >
            Empowering multiple industries with cutting-edge aerial capabilities
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {applications.map((app, index) => (
            <motion.div
              key={index}
              className="p-6 sm:p-7 rounded-2xl"
              style={{
                background: colorPalette.aboutCard,
                boxShadow: `0 2px 12px ${colorPalette.green4}11`,
                border: `1px solid ${colorPalette.green4}`,
              }}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-center pb-4">
                <div
                  className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: colorPalette.green5 }}
                >
                  <app.icon
                    className="h-6 w-6 text-white"
                    style={{ color: colorPalette.white }}
                  />
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold font-subheading"
                  style={{ color: colorPalette.aboutText }}
                >
                  {app.title}
                </h3>
              </div>

              <div className="text-center">
                <p
                  className="mb-4 text-sm sm:text-base"
                  style={{ color: colorPalette.green3 }}
                >
                  {app.description}
                </p>
                <ul className="space-y-2">
                  {app.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex items-center justify-center"
                      style={{ color: colorPalette.green2 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ background: colorPalette.green5 }}
                      ></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeApplications;
