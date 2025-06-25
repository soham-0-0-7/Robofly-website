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

const HomeApplications = () => {
  return (
    <section
      className="py-16 sm:py-20 flex justify-center items-center"
      style={{
        background: colorPalette.aboutBg,
        borderTop: `2px solid ${colorPalette.green4}`,
        borderBottom: `2px solid ${colorPalette.green4}`,
      }}
    >
      <div className="max-w-7xl w-full px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4" style={{ color: colorPalette.aboutText }}>
            Application <span style={{ color: colorPalette.green5 }}>Areas</span>
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: colorPalette.green3 }}>
            Empowering multiple industries with cutting-edge aerial capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              className="group p-6 sm:p-7 rounded-2xl hover:scale-[1.02] transition-transform"
              style={{
                background: colorPalette.aboutCard,
                boxShadow: `0 4px 24px ${colorPalette.green4}22`,
                border: `2px solid ${colorPalette.green4}`,
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="text-center pb-4">
                <div
                  className="mx-auto w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: colorPalette.green5 }}
                >
                  <app.icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: colorPalette.white }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: colorPalette.aboutText }}>
                  {app.title}
                </h3>
              </div>

              <div className="text-center">
                <p className="mb-4 text-sm sm:text-base" style={{ color: colorPalette.green3 }}>
                  {app.description}
                </p>
                <ul className="space-y-2">
                  {app.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex items-center justify-center hover:scale-105 transition-transform"
                      style={{ color: colorPalette.green2 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ background: colorPalette.green5 }}
                      ></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeApplications;