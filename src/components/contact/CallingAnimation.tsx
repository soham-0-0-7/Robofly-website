"use client";

import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import { PhoneCall, Building2, Mail, MapPin, Phone } from "lucide-react";

export default function CallingAnimation() {
  // Animation Variants
  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full p-0 -mt-8 flex justify-center items-center relative overflow-hidden"
    >
      {/* Background Pattern - z-0 */}
      <div className="absolute inset-0 z-20 opacity-40 pointer-events-none">
        {/* Static circles */}
        <div
          className="absolute top-10 left-10 w-32 h-32 border-2"
          style={{
            borderColor: colorPalette.green3,
            borderRadius: "9999px",
          }}
        />
        
        <div
          className="absolute top-10 right-10 w-48 h-48 border-2"
          style={{
            borderColor: colorPalette.green6,
            borderRadius: "9999px",
          }}
        />
        
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 border-2"
          style={{
            borderColor: colorPalette.green5,
            borderRadius: "9999px",
          }}
        />
        
        <div
          className="absolute top-1/4 right-10 w-40 h-40"
          style={{
            background: `radial-gradient(circle, ${colorPalette.green3}, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />
        
        <div
          className="absolute top-1/3 left-1/4 w-32 h-32"
          style={{
            background: `radial-gradient(circle, ${colorPalette.green5}, transparent 70%)`,
            filter: "blur(15px)",
          }}
        />
        
        <div
          className="absolute bottom-1/3 right-1/3 w-28 h-24"
          style={{
            background: `linear-gradient(45deg, ${colorPalette.green1}, ${colorPalette.green3})`,
            filter: "blur(18px)",
            borderRadius: "9999px",
          }}
        />

      </div>

      {/* Foreground Container - z-10 */}
      <div className="p-2.5 w-full max-w-7xl rounded-2xl relative z-0">
        <motion.div
          className={`relative w-full h-auto bg-gray-900 rounded-2xl flex flex-col items-center justify-center border-4 border-green-600`}
          whileTap={{ scale: 1 }}
          transition={{
            scale: { duration: 0.4, ease: "easeOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          animate={{
            boxShadow: [
              "0 4px 20px rgba(74, 222, 128, 0.1)",
              "0 8px 30px rgba(74, 222, 128, 0.2)",
              "0 4px 20px rgba(74, 222, 128, 0.1)",
            ],
          }}
        >
          {/* CallIconWithWaves - z-20 */}
          <div className="relative z-50 w-full opacity-100">
            <div className="relative flex items-center justify-center mb-6 w-full pt-8">
              <motion.div
                className="z-50 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-100"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 10px rgba(74, 222, 128, 0.5)",
                    "0 0 15px rgba(74, 222, 128, 0.8)",
                    "0 0 10px rgba(74, 222, 128, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.15,
                  x: [0, -2, 2, -2, 2, 0],
                  y: [0, 2, -2, 2, -2, 0],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <PhoneCall className="text-white w-10 h-10" />
              </motion.div>
            </div>
          </div>

          {/* ContactTextContent - z-20 */}
          <motion.div
            className="w-full flex flex-col items-center text-center gap-8 px-4 md:px-8 relative z-20"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white hover:scale-105 transition-transform duration-300"
            >
              Get in <span className="text-emerald-400">Touch</span>
            </motion.h1>

            <motion.p
              className="text-gray-300 max-w-2xl"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              We'd love to hear from you. Reach out to us for inquiries, collaborations, or just to say hello!
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl text-left items-start pt-2"
              variants={fadeInUp}
            >
              <motion.div
                className="space-y-4 rounded-lg transition-transform duration-300 h-full pl-4 pr-4 pb-4"
              >
                <h3 className="text-xl text-emerald-300 font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-300" /> Robofly Technology
                </h3>
                <div className="text-gray-300 space-y-2">
                  <motion.a
                    href="https://maps.google.com?q=A-123+Innovation+Park,+Robotics+Road,+Innovation+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                    A-123 Innovation Park, Robotics Road, Innovation City, IN 400001, India
                  </motion.a>
                  <motion.a
                    href="mailto:contact@roboflytech.com"
                    className="flex items-start gap-2"
                    whileHover={{ scale: 1.05}}
                  >
                    <Mail className="w-4 h-4 mt-1 text-emerald-400" /> contact@roboflytech.com
                  </motion.a>
                  <motion.a
                    href="tel:+919876543210"
                    className="flex items-start gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Phone className="w-4 h-4 mt-1 text-emerald-400" /> +91-9876543210
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4 h-full"
                variants={fadeInUp}
              >
                <h3 className="text-xl text-emerald-300 font-semibold">Office Hours</h3>
                <div className="text-gray-300 space-y-2">
                  {["Monday - Friday", "Saturday", "Sunday"].map((day, i) => {
                    const hours = i === 0 ? "9:00 AM - 6:00 PM" : i === 1 ? "10:00 AM - 4:00 PM" : "Closed";
                    return (
                      <motion.div
                        key={day}
                        className="flex justify-between pb-2 px-2 rounded-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span
                          className="text-base"
                          whileHover={{ scale: 1.1, color: colorPalette.green3 }}
                        >
                          {day}
                        </motion.span>
                        <motion.span
                          className="font-medium"
                          whileHover={{ scale: 1.1, color: colorPalette.green3 }}
                        >
                          {hours}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  className="mt-4 pt-4 border-t border-emerald-700"
                  variants={childVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <p className="flex items-start gap-2 text-sm text-emerald-300">
                    <span className="font-semibold">Note:</span>
                    Our support team typically responds within 24 hours on business days.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border border-emerald-400 mb-8"
              variants={fadeInUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
                width="100%"
                height="200"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}