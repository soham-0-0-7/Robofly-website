'use client';

import React from 'react';
import { Leaf, Map, ShieldCheck, Wrench, Flame, RefreshCcw } from 'lucide-react';
import Link from "next/link";
import { colorPalette } from "@/utils/variables";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Leaf,
      title: 'Agricultural Surveillance Solutions',
      description:
        'Comprehensive crop monitoring with NDVI analysis, vegetation indexing, growth tracking, mortality assessment, and AI-powered health diagnostics for precision agriculture optimization.',
      features: ['NDVI Analysis', 'Vegetation Indexing', 'Growth & Mortality Tracking']
    },
    {
      icon: Map,
      title: 'Mapping Services',
      description:
        'Professional surveying solutions including Digital Surface Models (DSM), Digital Terrain Models (DTM), orthophoto generation, and contour mapping with centimeter-level accuracy.',
      features: ['DSM & DTM Generation', 'Orthophoto Mapping', 'Contour Mapping']
    },
    {
      icon: ShieldCheck,
      title: 'Dam Analysis & Surveillance',
      description:
        'Critical infrastructure monitoring with structural integrity assessment, water level tracking, erosion detection, and predictive maintenance analytics using advanced sensor technology.',
      features: ['Structural Integrity Checks', 'Water Level Monitoring', 'Erosion Detection']
    },
    {
      icon: Wrench,
      title: 'Inspection Services',
      description:
        'Customized inspection solutions for infrastructure, industrial facilities, power lines, and hard-to-reach areas using thermal imaging, LiDAR, and high-resolution photography.',
      features: ['Thermal Imaging', 'LiDAR Scanning', 'Industrial Inspections']
    },
    {
      icon: Flame,
      title: 'Forest Fire Eradication System',
      description:
        'AI-powered fire prediction system with risk analysis, early detection capabilities, real-time monitoring, and automated alert systems for proactive forest fire management.',
      features: ['Fire Risk Prediction', 'Early Detection', 'Automated Alerts']
    },
    {
      icon: RefreshCcw,
      title: 'Post-Fire Analysis Services',
      description:
        'Comprehensive post-fire assessment including biodiversity impact analysis, area damage evaluation, recovery monitoring, and ecological restoration planning using multispectral imaging.',
      features: ['Biodiversity Impact', 'Damage Evaluation', 'Ecological Restoration']
    }
  ];

  return (
    <section
      className="py-16 sm:py-20 flex justify-center items-center"
      style={{
        background: colorPalette.aboutBg,
        borderTop: `2px solid ${colorPalette.green4}`,
        borderBottom: `2px solid ${colorPalette.green4}`,
      }}
    >
      <motion.div
        className="max-w-7xl w-full px-4"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4" style={{ color: colorPalette.aboutText }}>
            Our <span style={{ color: colorPalette.green5 }}>Services</span>
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: colorPalette.green3 }}>
            Comprehensive drone solutions tailored to meet the evolving needs of modern industries
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group p-6 sm:p-7 rounded-2xl hover:scale-[1.02] transition-transform"
              style={{
                background: colorPalette.aboutCard,
                boxShadow: `0 4px 24px ${colorPalette.green4}22`,
                border: `2px solid ${colorPalette.green4}`,
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Card Header */}
              <div className="text-center pb-4">
                <div
                  className="mx-auto w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    background: colorPalette.green5,
                  }}
                >
                  <service.icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: colorPalette.white }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: colorPalette.aboutText }}>
                  {service.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="text-center">
                <p className="mb-4 text-sm sm:text-base" style={{ color: colorPalette.green3 }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm flex items-center justify-center"
                      style={{ color: colorPalette.green2 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ background: colorPalette.green5 }}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="p-6 sm:p-8 rounded-2xl shadow-xl"
            style={{
              background: colorPalette.green2,
              color: colorPalette.white,
              boxShadow: `0 4px 24px ${colorPalette.green5}33`,
            }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Operations?</h3>
            <p className="text-base sm:text-lg mb-6 opacity-90">
              Discover how our drone solutions can revolutionize your business efficiency
            </p>
            <Link href="/contact">
              <button
                className="px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: colorPalette.white,
                  color: colorPalette.green3,
                  boxShadow: `0 2px 8px ${colorPalette.green5}22`,
                }}
              >
                Schedule Consultation
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
