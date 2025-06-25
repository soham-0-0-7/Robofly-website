"use client";

import { Mail, MapPin, Phone, Building2 } from "lucide-react";
import Image from "next/image";
import {colorPalette,imgSrc} from "@/utils/variables"


export default function ContactBanner() {
  return (
    <section
      className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#e4f1ec] to-white"
      style={{ backgroundColor: colorPalette.green7 }}
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/pattern-light.svg')] bg-repeat" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left Card */}
        <div className="relative bg-white rounded-2xl p-10 shadow-lg flex flex-col justify-between overflow-hidden border-4 border-[#399d6c]">
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={imgSrc}
                alt="Robofly Logo"
                width={60}
                height={60}
                className="rounded-sm border border-[#104a2f]"
              />
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ color: colorPalette.green1 }}
              >
                Contact <span style={{ color: colorPalette.green5 }}>Robofly</span>
              </h2>
            </div>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Your trusted tech solutions partner delivering impactful robotics and automation solutions.
            </p>
            <ul className="space-y-4 text-base text-gray-800">
              <li className="flex items-start gap-3 group hover:scale-[1.02] transition-transform">
                <Building2 className="w-5 h-5 mt-1 text-green-700" />
                <span>123 Tech Avenue</span>
              </li>
              <li className="flex items-start gap-3 group hover:scale-[1.02] transition-transform">
                <MapPin className="w-5 h-5 mt-1 text-green-700" />
                <span>Innovation City, IN 400001, India</span>
              </li>
              <li className="flex items-start gap-3 group hover:scale-[1.02] transition-transform">
                <Mail className="w-5 h-5 mt-1 text-green-700" />
                <a href="mailto:info@robofly.com" className="underline hover:text-green-800">
                  info@robofly.com
                </a>
              </li>
              <li className="flex items-start gap-3 group hover:scale-[1.02] transition-transform">
                <Phone className="w-5 h-5 mt-1 text-green-700" />
                <a href="tel:+911234567890" className="underline hover:text-green-800">
                  +91 12345 67890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Card (Map) */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-full border-4 border-[#399d6c]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="relative z-10 w-full h-[100%] min-h-[400px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
