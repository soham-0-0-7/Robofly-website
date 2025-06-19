import React from 'react';
import { colorPalette, imgSrc } from "@/utils/variables";
import ContactFormsSlider from "@/components/contact-soham/ContactFormsSlider";
import { MapPin, Building2, Mail, Phone } from 'lucide-react';
import Image from "next/image";

export default function ContactPage() {
  return (<>
    <div
      className="w-full flex flex-col items-center justify-center min-h-[100vh] pb-12"
      style={{
        minHeight: "100vh",
        background: colorPalette.whiteSmoke,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top Section: Contact Details + Map */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch gap-8 mt-10 px-4">
        {/* Contact Details */}
        <div
      className="flex-1 flex flex-col justify-center rounded-2xl shadow-xl p-8"
      style={{
        background: colorPalette.whiteSoft,
        border: `1.5px solid ${colorPalette.grayLight}`,
        minWidth: 320,
        minHeight: 340,
        boxShadow: `0 2px 12px ${colorPalette.blackShadow}55`,
      }}
    >
      <div className="flex items-center gap-5 mb-6">
        <Image
          src={imgSrc}
          alt="Robofly Logo"
          width={90}
          height={90}
          style={{
            borderRadius: 16,
            border: `2px solid ${colorPalette.greenOlive}`,
            background: colorPalette.whiteSmoke,
          }}
        />
        <div>
          <h1
            className="text-4xl font-extrabold tracking-tight mb-2"
            style={{
              color: colorPalette.greenDeep,
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            Contact Robofly
          </h1>
          <p
            className="text-base font-medium leading-relaxed"
            style={{ color: colorPalette.gray }}
          >
            Your trusted tech solutions partner delivering impactful robotics and automation solutions.
          </p>
        </div>
      </div>

      <div className="mt-2 text-[16px] space-y-3 font-medium" style={{ color: colorPalette.green1 }}>
        <div className="flex items-center gap-3">
          <Building2 size={20} color={colorPalette.greenOlive} />
          123 Tech Avenue
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={20} color={colorPalette.greenOlive} />
          Innovation City, IN 400001, India
        </div>

        <div className="flex items-center gap-3">
          <Mail size={20} color={colorPalette.greenOlive} />
          <a
            href="mailto:info@robofly.com"
            className="underline hover:text-green-700 transition"
            style={{ color: colorPalette.grayDark }}
          >
            info@robofly.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={20} color={colorPalette.greenOlive} />
          <a
            href="tel:+911234567890"
            className="underline hover:text-green-700 transition"
            style={{ color: colorPalette.grayDark }}
          >
            +91 12345 67890
          </a>
        </div>
      </div>
    </div>
        {/* Map */}
        <div
          className="flex-1 flex items-center justify-center rounded-2xl shadow-xl p-4"
          style={{
            background: colorPalette.whiteSoft,
            border: `1.5px solid ${colorPalette.grayLight}`,
            minWidth: 320,
            minHeight: 340,
            boxShadow: `0 2px 12px ${colorPalette.blackShadow}55`,
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{
              border: "0",
              borderRadius: "14px",
              minHeight: 250,
              maxWidth: "100%",
              boxShadow: `0 2px 12px ${colorPalette.blackShadow}55`,
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Robofly Location"
          />
        </div>
      </div>

      {/* Forms Section */}
      <div className="w-full max-w-5xl mt-14 px-4">
        <ContactFormsSlider />
      </div>
    </div>
    <div
      className="w-1/2 h-1 my-8 rounded-full m-auto"
      style={{ backgroundColor: colorPalette.green5 }}
    ></div>
  </>
  );
}
