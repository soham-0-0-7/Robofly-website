'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    'Advanced AI Integration',
    'Military-Grade Security',
    'Real-time Data Processing'
  ];

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-green-400">ROBOFLY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Engineering custom-made precision drones that serve the fields, forests, and frontlines.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">
              Empowering Agriculture, Forestry & Defense
            </h3>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              At <strong className="text-green-400">Robofly Technology</strong>, we engineer intelligent drone solutions that empower agriculture, forestry, and defense with precision, speed, and actionable insight.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Based in Bihar, India, we specialize in customized UAVs for surveillance, spraying, logistics, FPV operations, and advanced analytics. Our commitment lies in balancing innovation with real-world utility—bridging the gap between technology and nature.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              From optimizing crop yields to supplying high-performance drones to the Indian armed forces, Robofly delivers reliability across sectors. Whether it’s data-driven agriculture or national security, we provide the tools to act with clarity, control, and confidence.
            </p>

            {/* Key Features */}
            {/* <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative w-full h-80 max-w-md bg-gray-800 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30 hover:shadow-2xl transition duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <div className="w-16 h-10 bg-gray-900 rounded-lg opacity-80 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Advanced Technology</h4>
                <p className="text-gray-300">Next-gen drone solutions</p>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;