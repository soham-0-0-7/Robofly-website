"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { colorPalette } from "@/utils/variables";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative text-white py-16 mt-16 ${poppins.className} overflow-hidden`}
      style={{
        background: colorPalette.green2,
        borderTop: `4px solid ${colorPalette.green5}`,
        boxShadow: `0 0 60px 0 ${colorPalette.green3}33, 0 8px 32px 0 ${colorPalette.greenShadow}66`,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2" style={{ borderColor: colorPalette.green3, borderRadius: "9999px" }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2" style={{ borderColor: colorPalette.green6, borderRadius: "9999px" }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2" style={{ borderColor: colorPalette.green5, borderRadius: "9999px" }}></div>
        <div className="absolute bottom-0 right-1/2 w-40 h-12" style={{ background: colorPalette.green7, borderRadius: "9999px", filter: "blur(16px)" }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <img src="/images/robofly.png" alt="Robofly Logo" className="w-12 h-12 border-2" style={{ borderRadius: 12, borderColor: colorPalette.green5 }} />
              <span className="text-2xl font-bold tracking-wide" style={{ color: colorPalette.whiteSoft }}>Robofly</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Your trusted tech solutions provider, delivering innovative robotics and automation solutions for the future.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>&copy; {new Date().getFullYear()} Robofly</span>
              <span className="mx-1">|</span>
              <span>All rights reserved</span>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colorPalette.green6 }}>Contact</h4>
            <div className="text-white/80 text-sm mb-2">123 Tech Avenue</div>
            <div className="text-white/80 text-sm mb-2">Innovation City, IN 400001</div>
            <div className="text-white/80 text-sm mb-2">India</div>
            <div className="text-white/80 text-sm mb-2">Email: <a href="mailto:info@robofly.com" className="underline hover:text-green-200 transition">{'info@robofly.com'}</a></div>
            <div className="text-white/80 text-sm">Phone: <a href="tel:+911234567890" className="underline hover:text-green-200 transition">{'+91 12345 67890'}</a></div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colorPalette.green6 }}>Quick Links</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link href="/home" className="hover:text-green-200 transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-green-200 transition">Products</Link></li>
              <li><Link href="/services" className="hover:text-green-200 transition">Services</Link></li>
              <li><Link href="/catalog" className="hover:text-green-200 transition">Catalog</Link></li>
              <li><Link href="/blog" className="hover:text-green-200 transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-green-200 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colorPalette.green6 }}>Connect</h4>
            <div className="flex flex-col gap-3">
              <SocialLink
                href="https://instagram.com/"
                icon={<FaInstagram size={20} />}
                label="Instagram"
              />
              <SocialLink
                href="https://linkedin.com/"
                icon={<FaLinkedin size={20} />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://youtube.com/"
                icon={<FaYoutube size={20} />}
                label="YouTube"
              />
              <SocialLink
                href="mailto:info@robofly.com"
                icon={<FaEnvelope size={20} />}
                label="Email"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-white/60">
              &copy; {new Date().getFullYear()} Robofly. Crafted in India.
            </span>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-xs text-white/60 hover:text-green-200 transition">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-white/60 hover:text-green-200 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

// Social Link Component
function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-green6/20 hover:border-green5/40 transition-all duration-300 group"
      style={{
        color: colorPalette.green5,
      }}
    >
      <span className="text-green5 group-hover:text-green6 transition-colors duration-300">
        {icon}
      </span>
      <span className="text-white/80 group-hover:text-white font-medium">
        {label}
      </span>
    </a>
  );
}