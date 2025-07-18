"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Fewer Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 bg-green-400/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            About <span className="text-green-400">ROBOFLY</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto font-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Engineering custom-made precision drones that serve the fields,
            forests, and frontlines.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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
                analytics.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From optimizing crop yields to supplying high-performance drones
                to the Indian armed forces, Robofly delivers reliability across
                sectors.
              </p>
            </div>
          </motion.div>

          {/* Drone Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-full h-80 max-w-md bg-gray-800 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30">
              {/* Floating drone with slower animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Drone Body */}
                <div className="w-26 h-10 bg-green-400 rounded-full relative">
                  {/* Simplified rotating propellers */}
                  {[
                    "-top-2 -left-2",
                    "-top-2 -right-2",
                    "-bottom-2 -left-2",
                    "-bottom-2 -right-2",
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${pos} w-6 h-6`}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full" />
                      <div className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full" />
                      <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Text Below Drone */}
              <div className="text-center absolute bottom-4">
                <h4 className="text-xl font-bold text-white mb-2 font-subheading">
                  Advanced Technology
                </h4>
                <p className="text-gray-300">Next-gen drone solutions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
