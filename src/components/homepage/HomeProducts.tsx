'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colorPalette } from '@/utils/variables';

const HomeProducts = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const products = [
    { id: 1, name: "Surveillance Drone", image: "/images/surveillancedrone.jpg", description: "Advanced aerial surveillance systems with high-resolution cameras, real-time streaming, night vision capabilities, and AI-powered object detection for security applications." },
    { id: 2, name: "Agricultural Spraying Drone", image: "/images/spraydrone.jpg", description: "Precision agriculture drones with variable rate spraying, GPS guidance, crop health monitoring sensors, and automated flight patterns for efficient farming." },
    { id: 3, name: "Logistics Package Dropping Drone", image: "/images/logisticsdrone.jpg", description: "Heavy-lift cargo drones with precision drop systems, weather resistance, extended range capabilities, and automated delivery routing for last-mile logistics." },
    { id: 4, name: "FPV Drones", image: "/images/fpvdrone.jpg", description: "High-performance racing drones with low-latency video transmission, customizable flight controllers, carbon fiber frames, and immersive first-person view experience." },
    { id: 5, name: "Training Drones", image: "/images/trainingdrone.png", description: "Educational drone platforms with safety features, programmable flight modes, simulation software integration, and comprehensive learning modules for STEM education." },
    { id: 6, name: "Customizable Drone", image: "/images/customdrones.jpg", description: "Modular drone systems with interchangeable payloads, configurable flight parameters, open-source compatibility, and tailored solutions for specific industry requirements." }
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 80);
          }
        }, { threshold: 0.15 });

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colorPalette.green1 }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colorPalette.white, fontFamily: 'Poppins, sans-serif' }}>
            Our Drone Products
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: colorPalette.green6 }}></div>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: colorPalette.green4, fontFamily: 'Roboto, sans-serif' }}>
            Cutting-edge drone technology designed for various applications
          </p>
        </div>

        <div className="space-y-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { itemRefs.current[index] = el; }}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${visibleItems.has(index) ? 'translate-x-0 opacity-100' : index % 2 === 0 ? '-translate-x-12 opacity-0' : 'translate-x-12 opacity-0'}`}
              style={{ backgroundColor: colorPalette.green2 }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="relative lg:w-2/5 h-80 lg:h-auto overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>

                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: colorPalette.green6, fontFamily: 'Poppins, sans-serif' }}>
                      {product.name}
                    </h3>
                    <div className="w-16 h-1 mb-6" style={{ backgroundColor: colorPalette.green5 }}></div>
                    <p className="text-base lg:text-lg leading-relaxed" style={{ color: colorPalette.green4, fontFamily: 'Roboto, sans-serif' }}>
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/products">
                      <button className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105" style={{ backgroundColor: colorPalette.green5, color: colorPalette.white }}>
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-1 h-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`} style={{ backgroundColor: colorPalette.green5 }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
