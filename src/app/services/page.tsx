"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import services from "@/utils/services.json";
import { colorPalette } from "@/utils/variables";

interface Service {
  id: number;
  title: string;
  description: string;
  "main-image": string;
}

const convertGoogleDriveUrl = (shareUrl: string): string => {
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId}`
    : shareUrl;
};

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.02, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } },
    tap: { scale: 0.96 },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorPalette.white} 0%, ${colorPalette.whiteSoft} 30%, ${colorPalette.whiteSmoke} 70%, ${colorPalette.grayLight} 100%)`,
      }}
    >
      {/* Background elements removed to optimize performance */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r font-heading"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colorPalette.greenDeep} 0%, ${colorPalette.green1} 30%, ${colorPalette.blackMuted} 70%, ${colorPalette.greenShadow} 100%)`,
            }}
          >
            OUR SERVICES
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 font-subheading"
            style={{ color: colorPalette.greenDeep }}
          >
            Explore Robofly&apos;s innovative drone-based service offerings
            crafted for precision, safety, and efficiency across industries
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="space-y-16 md:space-y-24"
        >
          {services.map((service: Service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Image */}
              <motion.div
                className={`w-full lg:w-1/2 relative ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
                variants={imageVariants}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <motion.div
                    animate={
                      activeService === service.id
                        ? { scale: 1.02 }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className="aspect-[16/10] sm:aspect-[4/3] relative"
                  >
                    <Image
                      src={convertGoogleDriveUrl(service["main-image"])}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                className={`w-full lg:w-1/2 space-y-6 md:space-y-8 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
                initial={{ x: index % 2 === 1 ? 20 : -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-subheading"
                  style={{ color: colorPalette.green1 }}
                >
                  {service.title}
                </h2>

                <p
                  className="text-base sm:text-lg md:text-xl leading-relaxed"
                  style={{ color: colorPalette.blackMuted }}
                >
                  {service.description}
                </p>

                {/* Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href=""
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      style={{
                        backgroundColor: colorPalette.greenJade,
                        color: colorPalette.white,
                        border: `2px solid ${colorPalette.greenJade}`,
                      }}
                    >
                      Know More
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={`/contact?type=service&id=${service.id}`}
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      style={{
                        backgroundColor: "transparent",
                        color: colorPalette.greenJade,
                        border: `2px solid ${colorPalette.greenJade}`,
                      }}
                    >
                      Contact Now
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-24 md:mt-32 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-block p-6 md:p-8 rounded-3xl shadow-2xl max-w-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorPalette.greenDeep} 0%, ${colorPalette.green1} 50%, ${colorPalette.blackMuted} 100%)`,
              color: colorPalette.white,
            }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-heading">
              Need a Custom Service?
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
              Let&apos;s discuss how we can provide the perfect drone service
              for your specific requirements
            </p>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact?type=service"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300"
                style={{
                  backgroundColor: colorPalette.greenSeafoam,
                  color: colorPalette.greenDeep,
                }}
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
