'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TreePine, ShieldCheck, PackageCheck, Crosshair, BookOpenCheck } from 'lucide-react';
import { colorPalette } from '@/utils/variables';

const applications = [
  {
    icon: Leaf,
    title: 'Agriculture',
    description:
      'Advanced drone solutions for crop monitoring, NDVI analysis, yield prediction, plant health assessment, and precision spraying to help farmers make data-driven decisions and boost productivity.',
    points: [
      'Precision Spraying',
      'NDVI & Yield Analysis',
      'Plant Health Monitoring'
    ]
  },
  {
    icon: TreePine,
    title: 'Forestry',
    description:
      'Support for forest health monitoring, illegal logging detection, and wildfire risk analysis using drones integrated with AI-driven aerial insights.',
    points: [
      'Forest Health Monitoring',
      'Illegal Logging Detection',
      'Wildfire Risk & Recovery Analysis'
    ]
  },
  {
    icon: ShieldCheck,
    title: 'Surveillance & Security',
    description:
      'High-endurance surveillance drones for border security, perimeter monitoring, crowd control, and facility inspections, enhancing awareness and rapid response.',
    points: [
      'Crowd Surveillance',
      'Rapid Situational Response',
      'Border & Facility Monitoring'
    ]
  },
  {
    icon: PackageCheck,
    title: 'Logistics',
    description:
      'Drones developed for lightweight parcel delivery in difficult or remote areas, ideal for both civilian and defense logistics needs.',
    points: [
      'Last-Mile Delivery',
      'Parcel Dropping Drones',
      'Time-Sensitive Logistics'
    ]
  },
  {
    icon: Crosshair,
    title: 'Defense & Tactical Operations',
    description:
      'Rugged drones for defense operations including reconnaissance, surveillance, and FPV-based tactical simulation with payload capabilities.',
    points: [
      'FPV Navigation & Bomb Drop',
      'Reconnaissance & Surveillance',
      'Mission-Specific Customization'
    ]
  },
  {
    icon: BookOpenCheck,
    title: 'Training & Education',
    description:
      'Modular drones for hands-on training in universities and research institutes, focused on drone programming, assembly, and operation.',
    points: [
      'Flight Operations',
      'STEM Educational Use',
      'Drone Assembly Training'
    ]
  }
];

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

// Card animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: -10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    z: 50,
    boxShadow: `0 20px 40px ${colorPalette.green4}33`,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Icon animation variants
const iconVariants = {
  initial: { 
    scale: 1, 
    rotate: 0,
    filter: "brightness(1)"
  },
  hover: { 
    scale: 1.2, 
    rotate: 360,
    filter: "brightness(1.2)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      duration: 0.6
    }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Point animation variants
import type { Variants } from "framer-motion";

const pointVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.8
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }),
  hover: {
    scale: 1.05,
    x: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Floating animation for the entire section
const floatingVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  }
};

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
      variants={floatingVariants}
      animate="animate"
    >
      <div className="max-w-7xl w-full px-4">
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 12,
            duration: 1
          }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4" 
            style={{ color: colorPalette.aboutText }}
            whileHover={{ 
              scale: 1.05,
              textShadow: `0 0 20px ${colorPalette.green5}66`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Application{" "}
            <motion.span 
              style={{ color: colorPalette.green5 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ 
                scale: 1.1,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.5 }
              }}
            >
              Areas
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg max-w-3xl mx-auto" 
            style={{ color: colorPalette.green3 }}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Empowering multiple industries with cutting-edge aerial capabilities
          </motion.p>
        </motion.div>

        {/* Enhanced Cards Grid */}
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
              className="group p-6 sm:p-7 rounded-2xl cursor-pointer relative overflow-hidden"
              style={{
                background: colorPalette.aboutCard,
                boxShadow: `0 4px 24px ${colorPalette.green4}22`,
                border: `2px solid ${colorPalette.green4}`,
              }}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.green5}, ${colorPalette.green4})`
                }}
                initial={{ scale: 0, rotate: 180 }}
                whileHover={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
              />

              {/* Icon and Title Section */}
              <motion.div 
                className="text-center pb-4 relative z-10"
                variants={textVariants}
              >
                <motion.div
                  className="mx-auto w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center mb-4 relative"
                  style={{ background: colorPalette.green5 }}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Animated ring around icon */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 opacity-0"
                    style={{ borderColor: colorPalette.green3 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      scale: [1, 1.3, 1.5],
                      transition: { duration: 1, repeat: Infinity }
                    }}
                  />
                  <app.icon className="h-7 w-7 sm:h-8 sm:w-8 relative z-10" style={{ color: colorPalette.white }} />
                </motion.div>

                <motion.h3 
                  className="text-lg sm:text-xl font-bold group-hover:scale-105 transition-transform" 
                  style={{ color: colorPalette.aboutText }}
                  whileHover={{ 
                    color: colorPalette.green5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {app.title}
                </motion.h3>
              </motion.div>

              {/* Description and Points Section */}
              <motion.div 
                className="text-center relative z-10"
                variants={textVariants}
              >
                <motion.p 
                  className="mb-4 text-sm sm:text-base" 
                  style={{ color: colorPalette.green3 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {app.description}
                </motion.p>

                <motion.ul 
                  className="space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {app.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      className="text-sm flex items-center justify-center group/item"
                      style={{ color: colorPalette.green2 }}
                      custom={idx}
                      variants={pointVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ background: colorPalette.green5 }}
                        whileHover={{
                          scale: [1, 1.5, 1],
                          rotate: 360,
                          transition: { duration: 0.5 }
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 0 ${colorPalette.green5}00`,
                            `0 0 10px ${colorPalette.green5}66`,
                            `0 0 0 ${colorPalette.green5}00`
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3
                        }}
                      />
                      <motion.span
                        whileHover={{
                          color: colorPalette.green5,
                          fontWeight: "600"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {point}
                      </motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, ${colorPalette.white}40, transparent 70%)`
                }}
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "100%",
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating particles animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: colorPalette.green5,
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            opacity: 0.3
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </motion.section>
  );
};

export default HomeApplications;