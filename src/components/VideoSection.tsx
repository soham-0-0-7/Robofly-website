import React from "react";
import { videoSrc } from '@/utils/variables';

export default function VideoSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      

      

      {/* Centered Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">
          India&apos;s Trusted Leader in Advanced Drone Solutions and Impact
        </h1>
        <button className="mt-8 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition duration-300">
          Explore
        </button>
      </div>
    </section>
  );
}
