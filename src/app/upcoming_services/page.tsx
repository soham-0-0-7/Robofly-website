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

  const isDetailsInView = useInView(detailsRef, {
    once: true,
    margin: "-50px",
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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const arrowVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const slideInVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-cyan-700 to-blue-800 text-white border-b-4 border-b-teal-400">
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 font-heading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.7,
              }}
            >
              Upcoming Services
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-3 max-w-4xl mx-auto leading-relaxed font-subheading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Revolutionizing Drone Repairs: A Decentralized, Certified Service
              Ecosystem
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Flowchart Section */}
      <section className="py-20">
        <motion.div
          ref={flowchartRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFlowchartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
                transition={{ delay: index * 0.3 }}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="relative w-full max-w-sm mx-auto flex-shrink-0"
              >
                <motion.div
                  className={`${section.color} text-white px-6 py-5 rounded-t-xl font-bold text-center shadow-lg font-subheading`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg">{section.title}</h3>
                </motion.div>
                <div className="border-2 border-t-0 border-teal-300 rounded-b-xl shadow-lg bg-white">
                  {section.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isFlowchartInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.3 + i * 0.1 + 0.5 }}
                    >
                      <motion.div
                        className="p-7 text-center hover:bg-teal-50 transition-colors duration-200"
                        whileHover={{ backgroundColor: "rgb(240 253 250)" }}
                      >
                        <p className="text-base font-medium text-slate-700 leading-relaxed">
                          {step}
                        </p>
                      </motion.div>
                      {i < section.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <motion.div
                            variants={arrowVariants}
                            initial="hidden"
                            animate={isFlowchartInView ? "visible" : "hidden"}
                            transition={{ delay: index * 0.3 + i * 0.1 + 0.7 }}
                          >
                            <ArrowDown className="h-6 w-6 text-teal-500" />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {index < linearFlowData.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10"
                    variants={arrowVariants}
                    initial="hidden"
                    animate={isFlowchartInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.3 + 1 }}
                  >
                    <motion.div
                      className="bg-white border-2 border-teal-300 p-3 rounded-full shadow-lg"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="h-7 w-7 text-teal-600" />
                    </motion.div>
                  </motion.div>
                )}
                {index < linearFlowData.length - 1 && (
                  <motion.div
                    className="lg:hidden flex justify-center -mt-4"
                    variants={arrowVariants}
                    initial="hidden"
                    animate={isFlowchartInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.3 + 1 }}
                  >
                    <motion.div
                      className="bg-white border-2 border-teal-300 p-3 rounded-full shadow"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <ArrowDown className="h-6 w-6 text-teal-600" />
                    </motion.div>
                  </motion.div>
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
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveSection(activeSection === index ? null : index)
                }
                className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 font-subheading text-base font-medium shadow-lg hover:shadow-xl"
              >
                {activeSection === index
                  ? "Hide Details"
                  : `View ${section.title} Details`}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Detail Section with Animation */}
      <AnimatePresence mode="wait">
        {activeSection !== null && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="py-20 -mt-24"
          >
            <motion.section
              ref={detailsRef}
              className="container mx-auto px-4 border-teal-300 border-2 py-8 rounded-lg shadow-lg"
              style={{ background: "radial-gradient(circle,#ffffff,#f0fdfa)" }}
              initial={{ borderRadius: 0 }}
              animate={{ borderRadius: "0.5rem" }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`${linearFlowData[activeSection].color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  variants={floatingVariants}
                  animate="animate"
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-slate-800 font-heading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                >
                  {linearFlowData[activeSection].title}
                </motion.h2>
              </motion.div>

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
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-teal-200 h-full">
                      <CardContent className="p-8">
                        <motion.div
                          className="flex items-center mb-6"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.5 }}
                        >
                          <motion.div
                            className="bg-gradient-to-br from-teal-100 to-cyan-100 w-14 h-14 rounded-lg flex items-center justify-center mr-4"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <sub.icon className="text-teal-600 h-7 w-7" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-slate-800 font-subheading">
                            {sub.title}
                          </h3>
                        </motion.div>
                        <ul className="space-y-3">
                          {sub.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + i * 0.05 + 0.7 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="text-teal-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                              </motion.div>
                              <span className="text-slate-600 text-base leading-relaxed">
                                {detail}
                              </span>
                            </motion.li>
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

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 text-white -mb-20 border-t-4 border-teal-400 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-4 font-heading"
            variants={slideInVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
          >
            Ready to Join Our Ecosystem?
          </motion.h2>
          <motion.p
            className="text-lg mb-6 max-w-2xl mx-auto font-subheading"
            variants={slideInVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Whether you&apos;re a manufacturer, center, or drone owner — Robofly
            has your back.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <Link href="/contact">
              <motion.button
                className="px-8 py-3 rounded-full font-semibold bg-white text-teal-700 hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
