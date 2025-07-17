"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

  const flowchartRef = useRef(null);
  const isFlowchartInView = useInView(flowchartRef, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const flowchartData = [
    {
      id: "manufacturer",
      title: "Manufacturer",
      icon: Factory,
      color: "bg-blue-600",
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
      color: "bg-blue-500",
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
      color: "bg-blue-400",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white border-b-4 border-b-blue-400">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
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

      {/* Flowchart Section */}
      <section className="py-20">
        <motion.div
          ref={flowchartRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFlowchartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Service Process Flow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-subheading">
              A connected journey for manufacturers, service centers, and
              clients.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-8 justify-center">
            {linearFlowData.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative w-full max-w-sm mx-auto flex-shrink-0"
              >
                <div
                  className={`${section.color} text-white px-6 py-4 rounded-t-xl font-bold text-center shadow-lg font-subheading`}
                >
                  <h3>{section.title}</h3>
                </div>
                <div className="border-2 border-t-0 border-blue-300 rounded-b-xl shadow-lg bg-white">
                  {section.steps.map((step, i) => (
                    <div key={i}>
                      <div className="p-6 text-center hover:bg-blue-50 transition-colors duration-200">
                        <p className="text-sm font-medium text-gray-700 ">
                          {step}
                        </p>
                      </div>
                      {i < section.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown className="h-5 w-5 text-blue-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {index < linearFlowData.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-white border-2 border-blue-300 p-2 rounded-full shadow-lg">
                      <ArrowRight className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                )}
                {index < linearFlowData.length - 1 && (
                  <div className="lg:hidden flex justify-center -mt-4">
                    <div className="bg-white border-2 border-blue-300 p-2 rounded-full shadow">
                      <ArrowDown className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
            {linearFlowData.map((section, index) => (
              <button
                key={section.title}
                onClick={() =>
                  setActiveSection(activeSection === index ? null : index)
                }
                className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-subheading"
              >
                {activeSection === index
                  ? "Hide Details"
                  : `View ${section.title} Details`}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Detail Section with Animation */}

      {activeSection !== null && (
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="py-20 -mt-24"
        >
          <section
            className="container mx-auto px-4 border-blue-300 border-2 py-8 rounded-lg shadow-lg"
            style={{ background: "radial-gradient(circle,#ffffff,#e7f3ff)" }}
          >
            <div className="text-center mb-12">
              <div
                className={`${linearFlowData[activeSection].color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {activeSection === 0 && (
                  <Factory className="text-white w-8 h-8" />
                )}
                {activeSection === 1 && (
                  <Settings className="text-white w-8 h-8" />
                )}
                {activeSection === 2 && (
                  <Users className="text-white w-8 h-8" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 font-heading">
                {linearFlowData[activeSection].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {flowchartData[activeSection].subPoints.map((sub, idx) => (
                <Card
                  key={idx}
                  className="hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                        <sub.icon className="text-blue-600 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 font-subheading">
                        {sub.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {sub.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="text-blue-500 w-5 h-5 mr-3 mt-1" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white -mb-20 border-t-4 border-blue-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-heading">
            Ready to Join Our Ecosystem?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto font-subheading">
            Whether you're a manufacturer, center, or drone owner — Robofly has
            your back.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 rounded-full font-semibold bg-white text-blue-700 hover:bg-blue-100 transition-all duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
