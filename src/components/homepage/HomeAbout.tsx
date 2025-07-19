"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Simplified Background Elements - Reduced from 3 to 2 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.9, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Simplified */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">
            ABOUT <span className="text-green-400">ROBOFLY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-subheading">
            Engineering custom-made precision drones that serve the fields,
            forests, and frontlines.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Simplified animations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-400 font-subheading">
              Empowering Agriculture, Forestry & Defense
            </h3>

            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                At{" "}
                <strong className="text-green-400">Robofly Technology</strong>,
                we engineer intelligent drone solutions that empower
                agriculture, forestry, and defense with precision, speed, and
                actionable insight.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Based in Bihar, India, we specialize in customized UAVs for
                surveillance, spraying, logistics, FPV operations, and advanced
                analytics. Our commitment lies in balancing innovation with
                real-world utility—bridging the gap between technology and
                nature.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                From optimizing crop yields to supplying high-performance drones
                to the Indian armed forces, Robofly delivers reliability across
                sectors. Whether it&apos;s data-driven agriculture or national
                security, we provide the tools to act with clarity, control, and
                confidence.
              </p>
            </div>
          </motion.div>

          {/* Visual Element - Simplified Drone Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <motion.div
              className="relative w-full h-80 max-w-md bg-gray-800 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(74, 222, 128, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center flex flex-col items-center">
                {/* Drone Body - Simplified hovering effect */}
                <div className="relative flex items-center justify-center mb-6">
                  <motion.div
                    className="relative"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Main Body */}
                    <div className="w-26 h-10 bg-green-400 rounded-full relative shadow-lg shadow-green-400/30">
                      {/* Camera/Gimbal - Simplified rotation */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </motion.div>

                      {/* Propellers - Simplified to just spinning */}
                      {/* Top Left Propeller */}
                      <motion.div
                        className="absolute -top-2 -left-2 w-7 h-7"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full opacity-80" />
                        <div className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full opacity-80" />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Top Right Propeller */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-7 h-7"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full opacity-80" />
                        <div className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full opacity-80" />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Bottom Left Propeller */}
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-7 h-7"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full opacity-80" />
                        <div className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full opacity-80" />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Bottom Right Propeller */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-7 h-7"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full opacity-80" />
                        <div className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full opacity-80" />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <h4 className="text-xl font-bold text-white mb-2 font-subheading">
                  Advanced Technology
                </h4>
                <p className="text-gray-300">Next-gen drone solutions</p>
              </div>

              {/* Simplified Floating Particles - Reduced from 7 to 3 */}
              <motion.div
                className="absolute top-8 right-8 w-2 h-2 bg-green-400/40 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-green-300/30 rounded-full"
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute top-20 left-12 w-1 h-1 bg-blue-400/50 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
