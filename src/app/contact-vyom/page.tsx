'use client';

import { motion } from 'framer-motion';
import ContactBanner from '@/components/contact-vyom/components/ContactBanner';
import TabFormSwitcher from '@/components/contact-vyom/components/TabFormSwitcher';

const colorPalette = {
  green1: '#002d1a',
  green2: '#104a2f',
  green3: '#399d6c',
  green4: '#bde6cf',
  green5: '#1ba100',
  green6: '#8fe4ce',
  green7: '#e4f1ec',
  black: '#000000',
  white: '#ffffff',
};

// Animation variant function
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.3,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* === Contact Banner === */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        <ContactBanner />
      </motion.div>

      {/* === Separator Line === */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={1}
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      />

      {/* === Tab Form Section === */}
      <motion.main
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={2}
        className="min-h-screen"
      >
        <TabFormSwitcher />
      </motion.main>

      {/* === Bottom Separator Line === */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={3}
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      />
    </div>
  );
}
