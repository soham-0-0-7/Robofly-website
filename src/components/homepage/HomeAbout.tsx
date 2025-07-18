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
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/10 rounded-full blur-lg"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 font-heading"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            About{" "}
            <motion.span
              className="text-green-400"
              animate={{
                textShadow: [
                  "0 0 10px #4ade80",
                  "0 0 20px #4ade80",
                  "0 0 10px #4ade80",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ROBOFLY
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto font-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            Engineering custom-made precision drones that serve the fields,
            forests, and frontlines.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-6 text-green-400 font-subheading"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 15px #4ade80",
              }}
            >
              Empowering Agriculture, Forestry & Defense
            </motion.h3>

            <motion.div className="space-y-4">
              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                At{" "}
                <motion.strong
                  className="text-green-400"
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 10px #4ade80",
                  }}
                >
                  Robofly Technology
                </motion.strong>
                , we engineer intelligent drone solutions that empower
                agriculture, forestry, and defense with precision, speed, and
                actionable insight.
              </motion.p>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                Based in Bihar, India, we specialize in customized UAVs for
                surveillance, spraying, logistics, FPV operations, and advanced
                analytics. Our commitment lies in balancing innovation with
                real-world utility—bridging the gap between technology and
                nature.
              </motion.p>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                From optimizing crop yields to supplying high-performance drones
                to the Indian armed forces, Robofly delivers reliability across
                sectors. Whether it&apos;s data-driven agriculture or national
                security, we provide the tools to act with clarity, control, and
                confidence.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Visual Element - Drone Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <motion.div
              className="relative w-full h-80 max-w-md bg-gray-800 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30 transition duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(74, 222, 128, 0.3)",
                borderColor: "rgba(74, 222, 128, 0.6)",
              }}
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(74, 222, 128, 0.1)",
                  "0 8px 30px rgba(74, 222, 128, 0.2)",
                  "0 4px 20px rgba(74, 222, 128, 0.1)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="text-center flex flex-col items-center">
                {/* Drone Body - Centered Container */}
                <div className="relative flex items-center justify-center mb-6">
                  <motion.div
                    className="relative"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {/* Main Body */}
                    <motion.div
                      className="w-26 h-10 bg-green-400 rounded-full relative"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(74, 222, 128, 0.5)",
                          "0 0 30px rgba(74, 222, 128, 0.8)",
                          "0 0 20px rgba(74, 222, 128, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Camera/Gimbal */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>

                      {/* Propellers with Enhanced Animation */}
                      {/* Top Left Propeller */}
                      <motion.div
                        className="absolute -top-2 -left-2 w-7 h-7"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <motion.div
                          className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Top Right Propeller */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-7 h-7"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 0.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <motion.div
                          className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.1,
                          }}
                        />
                        <motion.div
                          className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.1,
                          }}
                        />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Bottom Left Propeller */}
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-7 h-7"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 0.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <motion.div
                          className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>

                      {/* Bottom Right Propeller */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-7 h-7"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <motion.div
                          className="w-full h-0.5 bg-gray-300 absolute top-1/2 left-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        />
                        <motion.div
                          className="w-0.5 h-full bg-gray-300 absolute left-1/2 top-0 origin-center rounded-full"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        />
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                <motion.h4
                  className="text-xl font-bold text-white mb-2 font-subheading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{
                    scale: 1.05,
                    color: "#4ade80",
                  }}
                >
                  Advanced Technology
                </motion.h4>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Next-gen drone solutions
                </motion.p>
              </div>

              {/* Enhanced Floating Particles */}
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
                whileHover={{ scale: 2 }}
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
                whileHover={{ scale: 2 }}
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
                whileHover={{ scale: 2 }}
              />

              {/* Additional Floating Elements */}
              <motion.div
                className="absolute top-16 right-20 w-1 h-1 bg-yellow-400/70 rounded-full"
                animate={{
                  x: [0, 10, 0],
                  y: [0, -12, 0],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              />
              <motion.div
                className="absolute bottom-20 right-12 w-1.5 h-1.5 bg-purple-400/50 rounded-full"
                animate={{
                  x: [0, -8, 0],
                  y: [0, -18, 0],
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.8,
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
