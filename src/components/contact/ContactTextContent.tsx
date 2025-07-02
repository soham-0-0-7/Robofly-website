"use client";

import { motion } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

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

export default function ContactTextContent() {
  return (
    <motion.div
      className="w-full flex flex-col items-center text-center gap-8 px-4 md:px-8"
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white hover:scale-105 transition-transform duration-300"
        
      >
        Get in <span className="text-emerald-400">Touch</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-300 max-w-2xl"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        We'd love to hear from you. Reach out to us for inquiries, collaborations, or just to say hello!
      </motion.p>

      {/* Info Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl text-left items-start pt-2"
        variants={fadeInUp}
      >
        {/* Company Info */}
        <motion.div
          className="space-y-4 rounded-lg transition-transform duration-300 h-full pl-4 pr-4 pb-4"
          
        >
          <h3 className="text-xl text-emerald-300 font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-300" /> Robofly Technologies
          </h3>
          <div className="text-gray-300 space-y-2">
            <motion.a
              href="https://maps.google.com?q=A-123+Innovation+Park,+Robotics+Road,+Innovation+City"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-4 h-4 mt-1 text-emerald-400" />
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

        {/* Working Hours */}
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

          {/* Note Section */}
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

      {/* Map */}
      <motion.div
        className="mt-8 w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border border-emerald-400 mb-8 opacity-100 z-20"
        variants={fadeInUp}
      >
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
          width="100%"
          height="200"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}
