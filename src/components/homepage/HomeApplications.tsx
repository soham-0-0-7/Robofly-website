'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colorPalette } from '@/utils/variables';

const HomeApplications = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applications = [
    { id: 1, name: "Agricultural Surveillance Solutions", image: "/images/agriculture.jpg", description: "Comprehensive crop monitoring with NDVI analysis, vegetation indexing, growth tracking, mortality assessment, and AI-powered health diagnostics for precision agriculture optimization." },
    { id: 2, name: "Mapping Services", image: "/images/mapping.png ", description: "Professional surveying solutions including Digital Surface Models (DSM), Digital Terrain Models (DTM), orthophoto generation, and contour mapping with centimeter-level accuracy." },
    { id: 3, name: "Dam Analysis & Surveillance", image: "/images/dam.jpg", description: "Critical infrastructure monitoring with structural integrity assessment, water level tracking, erosion detection, and predictive maintenance analytics using advanced sensor technology." },
    { id: 4, name: "Inspection Services", image: "/images/inspection.jpg", description: "Customized inspection solutions for infrastructure, industrial facilities, power lines, and hard-to-reach areas using thermal imaging, LiDAR, and high-resolution photography." },
    { id: 5, name: "Forest Fire Eradication System", image: "/images/forestfire.png", description: "AI-powered fire prediction system with risk analysis, early detection capabilities, real-time monitoring, and automated alert systems for proactive forest fire management." },
    { id: 6, name: "Post-Fire Analysis Services", image: "/images/postforestfire.png", description: "Comprehensive post-fire assessment including biodiversity impact analysis, area damage evaluation, recovery monitoring, and ecological restoration planning using multispectral imaging." }
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 100);
          }
        }, { threshold: 0.2 });

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colorPalette.white }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colorPalette.green1, fontFamily: 'Poppins, sans-serif' }}>
            Our Applications
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: colorPalette.green5 }}></div>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: colorPalette.green2, fontFamily: 'Roboto, sans-serif' }}>
            Innovative drone solutions transforming industries through advanced technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {applications.map((application, index) => (
            <div
              key={application.id}
              ref={el => { itemRefs.current[index] = el; }}
              className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform ${visibleItems.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ backgroundColor: colorPalette.green7 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={application.image} alt={application.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colorPalette.green5, color: colorPalette.white }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2" style={{ color: colorPalette.green1, fontFamily: 'Poppins, sans-serif' }}>
                  {application.name}
                </h3>
                <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: colorPalette.green2, fontFamily: 'Roboto, sans-serif' }}>
                  {application.description}
                </p>

                <Link href="/services">
                  <button className="inline-flex items-center px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-md" style={{ backgroundColor: colorPalette.green3, color: colorPalette.white }}>
                    Learn More
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: colorPalette.green5 }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeApplications;
