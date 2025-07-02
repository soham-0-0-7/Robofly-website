'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactFormsSlider from '@/components/contact/ContactFormsSlider';
import { colorPalette } from '@/utils/variables';

// interface ContactPageProps {
//   params?: {
//     id?: string;
//     type?: string;
//   };
// }

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
export default function ContactPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const type = searchParams.get('type') || '';

  console.log('type:', type, 'id:', id);

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background: `radial-gradient(${colorPalette.green3}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-64 -left-64 w-[900px] h-[900px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(${colorPalette.green4}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: colorPalette.green1 }}
          >
            Get in{" "}
            <motion.span
              style={{ color: colorPalette.green5 }}
              animate={{
                color: [colorPalette.green5, colorPalette.green3, colorPalette.green5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Touch
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: colorPalette.gray }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We&apos;d love to hear from you. Reach out to us for inquiries,
            collaborations, or just to say hello!
          </motion.p>
        </motion.div>

        {/* Form + Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10 items-start mr-10">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInLeft}
            className="w-full"
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <ContactFormsSlider id={id} type={type} />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInRight}
            className="flex flex-col h-full relative"
          >
            <motion.div
              className="rounded-xl p-6 mb-8"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: `1px solid ${colorPalette.green7}`,
              }}
              variants={scaleIn}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 40px -12px ${colorPalette.greenShadow}15`,
              }}
              animate={{
                boxShadow: [
                  `0 10px 30px -12px ${colorPalette.greenShadow}08`,
                  `0 15px 35px -12px ${colorPalette.greenShadow}12`,
                  `0 10px 30px -12px ${colorPalette.greenShadow}08`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ContactBanner />
            </motion.div>

            <motion.div
              className="rounded-3xl p-8"
              style={{
                background: colorPalette.green7,
                border: `1px solid ${colorPalette.green4}`,
              }}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-xl font-bold mb-4"
                style={{ color: colorPalette.green1 }}
              >
                Office Hours & Support
              </motion.h3>

              <motion.div
                className="space-y-4"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { label: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                  { label: "Saturday", time: "10:00 AM - 4:00 PM" },
                  { label: "Sunday", time: "Closed" },
                ].map((entry, idx) => (
                  <motion.div
                    key={idx}
                    className="flex justify-between border-b pb-2 last:border-b-0 last:pb-0"
                    style={{ borderColor: colorPalette.green4 }}
                    variants={childVariants}
                  >
                    <span style={{ color: colorPalette.green2 }}>{entry.label}</span>
                    <span
                      className="font-medium"
                      style={{ color: colorPalette.green3 }}
                    >
                      {entry.time}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 pt-4 border-t"
                style={{ borderColor: colorPalette.green4 }}
                variants={childVariants}
              >
                <p className="flex items-start gap-2" style={{ color: colorPalette.green2 }}>
                  <span className="font-medium">Note:</span>
                  <span>Our support team typically responds within 24 hours on business days.</span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6 h-20 w-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 0.2 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div
                className="w-full h-full rounded-b-3xl"
                style={{
                  background: `radial-gradient(circle at top, ${colorPalette.green3}20 0%, transparent 80%)`,
                }}
                animate={{
                  background: [
                    `radial-gradient(circle at top, ${colorPalette.green3}20 0%, transparent 80%)`,
                    `radial-gradient(circle at top, ${colorPalette.green4}25 0%, transparent 85%)`,
                    `radial-gradient(circle at top, ${colorPalette.green3}20 0%, transparent 80%)`,
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Email */}
      <motion.div
        className="fixed right-6 bottom-6 z-20 flex flex-col gap-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.a
          href="mailto:arpana@roboflytech.com"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: colorPalette.green5,
            boxShadow: `0 4px 20px ${colorPalette.greenShadow}30`,
          }}
          aria-label="Email us"
          whileHover={{
            scale: 1.15,
            rotate: 5,
            boxShadow: `0 8px 30px ${colorPalette.greenShadow}40`,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </motion.svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
