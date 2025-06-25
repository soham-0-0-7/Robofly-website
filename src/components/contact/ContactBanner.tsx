"use client";

import { Mail, MapPin, Phone, Building2 } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/utils/variables";

export default function ContactBanner() {
  return (
    <section className="w-full">
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">
        {/* Logo and Heading */}
        <div className="flex items-center gap-4">
          <Image
            src={imgSrc}
            alt="Robofly Logo"
            width={40}
            height={40}
            className="border border-green-700 rounded-sm"
          />
          <h2 className="text-2xl font-semibold text-green-800">
            Contact <span className="text-green-600">Robofly</span>
          </h2>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-700">
          Your trusted tech solutions partner delivering impactful robotics and automation solutions.
        </p>

        {/* Contact Info */}
        <ul className="text-sm text-gray-800 space-y-2">
          <li className="flex items-start gap-2">
            <Building2 className="w-4 h-4 mt-0.5 text-green-600" />
            <span>123 Tech Avenue</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-green-600" />
            <span>Innovation City, IN 400001, India</span>
          </li>
          <li className="flex items-start gap-2">
            <Mail className="w-4 h-4 mt-0.5 text-green-600" />
            <a href="mailto:info@robofly.com" className="hover:text-green-800 underline">
              info@robofly.com
            </a>
          </li>
          <li className="flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 text-green-600" />
            <a href="tel:+911234567890" className="hover:text-green-800 underline">
              +91 12345 67890
            </a>
          </li>
        </ul>

        {/* Embedded Map */}
        <div className="w-full mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
            className="w-full h-[300px] border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
