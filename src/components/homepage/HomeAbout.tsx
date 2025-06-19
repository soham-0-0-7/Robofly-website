'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // const stats = [
  //   { icon: Award, value: '50+', label: 'Awards Won', color: 'text-yellow-500' },
  //   { icon: Users, value: '100+', label: 'Expert Team', color: 'text-blue-500' },
  //   { icon: Globe, value: '25+', label: 'Countries Served', color: 'text-green-500' },
  //   { icon: TrendingUp, value: '500%', label: 'Growth Rate', color: 'text-purple-500' }
  // ];

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
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Floating Dots */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
          // style={{
          //   left: `${Math.random() * 100}%`,
          //   top: `${Math.random() * 100}%`,
          //   animationDelay: `${Math.random() * 2}s`
          // }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-green-400">ROBOFLY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading the drone revolution with innovative technology and unmatched expertise
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Text Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">
              Innovating Since 2025
            </h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Your trusted tech solutions provider, delivering innovative robotics and automation solutions for the future. We specialize in cutting-edge drone technology that transforms industries and creates new possibilities.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              From autonomous flight systems to AI-powered analytics, we&apos;re pioneering the next generation of aerial technology. Our team of experts combines years of experience with innovative thinking to deliver solutions that exceed expectations.
            </p>

            {/* Key Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center">
            <div className="relative w-full h-80 max-w-md bg-gray-800 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30 hover:shadow-2xl transition duration-300">

              {/* Floating Drone Representation */}
              <div className="text-center">
                <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <div className="w-16 h-10 bg-gray-900 rounded-lg opacity-80 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Advanced Technology</h4>
                <p className="text-gray-300">Next-gen drone solutions</p>
              </div>

              {/* Floating circles */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform transition-transform hover:scale-105">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white/10 backdrop-blur-sm border border-white/20 ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </motion.section>
  );
};

export default About;
