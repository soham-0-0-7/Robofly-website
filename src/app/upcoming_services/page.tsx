"use client";
import React, { useState, useRef } from "react";
import {
  ArrowRight,
  Factory,
  Settings,
  Users,
  CheckCircle,
  Clock,
  Shield,
  Star,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Page = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const flowchartRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);

  const isFlowchartInView = useInView(flowchartRef, {
    once: true,
    margin: "-100px",
  });

  const isCtaInView = useInView(ctaRef, {
    once: true,
    margin: "-100px",
  });

  const flowchartData = [
    {
      id: "manufacturer",
      title: "Manufacturer",
      icon: Factory,
      color: "bg-gradient-to-br from-teal-600 to-cyan-600",
      position: "left",
      connections: ["certified-centers"],
      subPoints: [
        {
          title: "Partner with Robofly",
          icon: CheckCircle,
          details: [
            "Sign a collaboration agreement.",
            "Upload brand repair expectations.",
            "Become a verified partner.",
          ],
        },
        {
          title: "Integrate Repair Guidelines",
          icon: Settings,
          details: [
            "Upload SOPs and manuals.",
            "Define tools and standards.",
            "Align warranty policies.",
          ],
        },
        {
          title: "Monitor Metrics",
          icon: Shield,
          details: [
            "Track repair success rates.",
            "View satisfaction feedback.",
            "Get alerts on issues.",
          ],
        },
        {
          title: "Boost Retention",
          icon: Star,
          details: [
            "Ensure faster turnaround.",
            "Improve loyalty & support.",
            "Build trust post-sale.",
          ],
        },
      ],
    },
    {
      id: "certified-centers",
      title: "Certified Service Centers",
      icon: Settings,
      color: "bg-gradient-to-br from-cyan-600 to-blue-600",
      position: "center",
      connections: ["drone-clients"],
      subPoints: [
        {
          title: "Apply & Qualify",
          icon: CheckCircle,
          details: [
            "Submit business credentials.",
            "Meet vetting standards.",
            "Sign SLA with Robofly.",
          ],
        },
        {
          title: "Get Certified",
          icon: Settings,
          details: [
            "Attend brand training.",
            "Pass practical assessments.",
            "Earn certification badge.",
          ],
        },
        {
          title: "Start Servicing",
          icon: Clock,
          details: [
            "Get listed on platform.",
            "Receive real-time jobs.",
            "Manage delivery & pickup.",
          ],
        },
        {
          title: "Maintain Quality",
          icon: Shield,
          details: [
            "Follow SOPs.",
            "Submit repair audits.",
            "Access live support.",
          ],
        },
      ],
    },
    {
      id: "drone-clients",
      title: "Drone Clients",
      icon: Users,
      color: "bg-gradient-to-br from-blue-600 to-indigo-600",
      position: "right",
      connections: [],
      subPoints: [
        {
          title: "Submit Request",
          icon: Settings,
          details: [
            "Describe issues online.",
            "Attach media files.",
            "Pick slot for service.",
          ],
        },
        {
          title: "Auto Assignment",
          icon: CheckCircle,
          details: [
            "Get nearest center.",
            "View technician details.",
            "Select delivery method.",
          ],
        },
        {
          title: "Quality Repairs",
          icon: Clock,
          details: [
            "Certified technicians.",
            "Transparent pricing.",
            "Warranty on parts.",
          ],
        },
        {
          title: "Feedback & Loyalty",
          icon: Star,
          details: [
            "Rate service experience.",
            "Earn rewards.",
            "Back in the air fast!",
          ],
        },
      ],
    },
  ];

  const linearFlowData = flowchartData.map((f) => ({
    title: f.title,
    color: f.color,
    steps: f.subPoints.map((s) => s.title),
  }));

  // Simplified animation variants - keeping only essential ones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-cyan-700 to-blue-800 text-white border-b-4 border-b-teal-400">
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Reduced background elements from 6 to 2 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 80,
                height: 80,
                left: `${20 + i * 60}%`,
                top: `${30 + i * 40}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Upcoming Services
            </h1>
            <p className="text-xl md:text-2xl mb-3 max-w-4xl mx-auto leading-relaxed font-subheading">
              Revolutionizing Drone Repairs: A Decentralized, Certified Service
              Ecosystem
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flowchart Section - Simplified */}
      <section className="py-20">
        <motion.div
          ref={flowchartRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isFlowchartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isFlowchartInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-5xl font-bold text-slate-800 mb-6 font-heading"
              variants={itemVariants}
            >
              Service Process Flow
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 max-w-3xl mx-auto font-subheading leading-relaxed"
              variants={itemVariants}
            >
              A connected journey for manufacturers, service centers, and
              clients.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-8 justify-center">
            {linearFlowData.map((section, index) => (
              <motion.div
                key={section.title}
                variants={cardVariants}
                initial="hidden"
                animate={isFlowchartInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="relative w-full max-w-sm mx-auto flex-shrink-0"
              >
                <div
                  className={`${section.color} text-white px-6 py-5 rounded-t-xl font-bold text-center shadow-lg font-subheading`}
                >
                  <h3 className="text-xl">{section.title}</h3>
                </div>
                <div className="border-2 border-t-0 border-teal-300 rounded-b-xl shadow-lg bg-white">
                  {section.steps.map((step, i) => (
                    <div key={i}>
                      <div className="p-7 text-center hover:bg-teal-50 transition-colors duration-200">
                        <p className="text-lg font-medium text-slate-700 leading-relaxed">
                          {step}
                        </p>
                      </div>
                      {i < section.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown className="h-6 w-6 text-teal-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {index < linearFlowData.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-white border-2 border-teal-300 p-3 rounded-full shadow-lg">
                      <ArrowRight className="h-7 w-7 text-teal-600" />
                    </div>
                  </div>
                )}
                {index < linearFlowData.length - 1 && (
                  <div className="lg:hidden flex justify-center -mt-4">
                    <div className="bg-white border-2 border-teal-300 p-3 rounded-full shadow">
                      <ArrowDown className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate={isFlowchartInView ? "visible" : "hidden"}
          >
            {linearFlowData.map((section, index) => (
              <motion.button
                key={section.title}
                variants={itemVariants}
                onClick={() =>
                  setActiveSection(activeSection === index ? null : index)
                }
                className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 font-subheading text-base font-medium shadow-lg hover:shadow-xl"
              >
                {activeSection === index
                  ? "Hide Details"
                  : `View ${section.title} Details`}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Detail Section - Simplified */}
      <AnimatePresence mode="wait">
        {activeSection !== null && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-20 -mt-24"
          >
            <motion.section
              ref={detailsRef}
              className="container mx-auto px-4 border-teal-300 border-2 py-8 rounded-lg shadow-lg"
              style={{ background: "radial-gradient(circle,#ffffff,#f0fdfa)" }}
            >
              <div className="text-center mb-12">
                <div
                  className={`${linearFlowData[activeSection].color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {activeSection === 0 && (
                    <Factory className="text-white w-10 h-10" />
                  )}
                  {activeSection === 1 && (
                    <Settings className="text-white w-10 h-10" />
                  )}
                  {activeSection === 2 && (
                    <Users className="text-white w-10 h-10" />
                  )}
                </div>
                <h2 className="text-4xl font-bold text-slate-800 font-heading">
                  {linearFlowData[activeSection].title}
                </h2>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {flowchartData[activeSection].subPoints.map((sub, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="hover:shadow-lg transition-shadow duration-200"
                  >
                    <Card className="border-teal-200 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-14 h-14 rounded-lg flex items-center justify-center mr-4">
                            <sub.icon className="text-teal-600 h-7 w-7" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 font-subheading">
                            {sub.title}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {sub.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="text-teal-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-slate-600 text-base leading-relaxed">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section - Simplified */}
      <motion.section
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 text-white -mb-20 border-t-4 border-teal-400 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Reduced background elements from 8 to 3 */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 60,
                height: 60,
                left: `${20 + i * 30}%`,
                top: `${20 + i * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 font-heading">
            Ready to Join Our Ecosystem?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto font-subheading">
            Whether you&apos;re a manufacturer, center, or drone owner — Robofly
            has your back.
          </p>
          <div>
            <Link href="/contact">
              <button className="px-8 py-3 rounded-full font-semibold bg-white text-teal-700 hover:bg-teal-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
