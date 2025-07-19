"use client";

// import { motion } from "framer-motion";
// import { colorPalette } from "@/utils/variables";
import { PhoneCall, Building2, Mail, MapPin, Phone } from "lucide-react";

export default function CallingAnimation() {
  return (
    <section className="w-full flex justify-center items-center bg-gray-900 py-16 px-4">
      <div className="w-full max-w-5xl rounded-2xl border border-green-600 p-6">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <PhoneCall className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Get in <span className="text-emerald-400">Touch</span>
          </h1>
          <p className="text-gray-300 text-center max-w-xl mb-8">
            We&apos;d love to hear from you. Reach out to us for inquiries,
            collaborations, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-300 font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5" /> Robofly Technologies
            </h3>
            <div className="space-y-2">
              <a
                href="https://www.google.com/maps?ll=25.551135,85.15283&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=17456484356961713230"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-emerald-300"
              >
                <MapPin className="w-4 h-4 mt-1 text-emerald-400" />
                H523+F44, Udaini - Sampatchak Rd, Udaini, Bhelaura, Bihar
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=arpana@roboflytech.com"
                className="flex items-start gap-2 hover:text-emerald-300"
              >
                <Mail className="w-4 h-4 mt-1 text-emerald-400" />{" "}
                arpana@roboflytech.com
              </a>
              <a
                href="tel:+917407583193"
                className="flex items-start gap-2 hover:text-emerald-300"
              >
                <Phone className="w-4 h-4 mt-1 text-emerald-400" />
                +91-7407583193
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl text-emerald-300 font-semibold">
              Office Hours
            </h3>
            <div className="space-y-2">
              {[
                { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between px-2">
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-emerald-300 pt-4 border-t border-emerald-700">
              <span className="font-semibold">Note:</span> Our support team
              typically responds within 24 hours on business days.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6169138564223!2d85.15025467517579!3d25.551134577484824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a700012349ef%3A0xf241e408c3ddbc4e!2sRobofly%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1750332929907!5m2!1sen!2sin"
            width="100%"
            height="250"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-lg border border-emerald-400 shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
