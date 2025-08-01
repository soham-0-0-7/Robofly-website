"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { colorPalette } from "@/utils/variables";
import { CldImage } from "next-cloudinary";
import LoadingSpinner from "@/components/global/LoadingSpinner";

interface Service {
  id: number;
  title: string;
  description: string;
  mainImage: string;
}

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/services/getAll");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch services");
        }

        setServices(data.services);
        // Short delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setIsLoaded(true);
        }, 500);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services. Please try again later.");
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    fetchServices();
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-center text-lg">{error}</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingSpinner text="Loading our premium drone services..." />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colorPalette.white} 0%, ${colorPalette.whiteSoft} 30%, ${colorPalette.whiteSmoke} 70%, ${colorPalette.grayLight} 100%)`,
          }}
        >
          <div className="absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
                className="text-base font-bold sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 font-heading"
                style={{ color: colorPalette.green5 }}
              >
                Explore Robofly&apos;s innovative drone-based service offerings
                crafted for precision, safety, and efficiency across industries
              </p>
            </motion.div>

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
                  <motion.div
                    className={`w-full lg:w-1/2 relative ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                    variants={imageVariants}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <motion.div
                        animate={
                          activeService === service.id
                            ? { scale: 1.02 }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                        className="aspect-[16/10] sm:aspect-[4/3] relative"
                      >
                        <CldImage
                          src={service.mainImage}
                          alt={service.title}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index < 2}
                          className="object-cover transition-transform duration-500"
                          crop="fill"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`w-full lg:w-1/2 space-y-6 md:space-y-8 ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                    initial={{ x: index % 2 === 1 ? 20 : -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-subheading"
                      style={{ color: colorPalette.greenDeep }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-base sm:text-lg md:text-xl leading-relaxed"
                      style={{ color: colorPalette.grayDark }}
                    >
                      {service.description}
                    </p>

                    <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
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
                            backgroundColor: colorPalette.greenDeep,
                            color: colorPalette.white,
                            border: `2px solid ${colorPalette.greenDeep}`,
                          }}
                        >
                          Get a Quote
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-24 md:mt-32 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-block p-6 md:p-8 rounded-3xl shadow-2xl max-w-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.greenDeep} 0%, ${colorPalette.green2} 100%)`,
                  color: colorPalette.white,
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-heading">
                  Looking for a Customized Service?
                </h3>
                <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
                  Contact us to discuss your specific requirements and how we can
                  tailor our drone services to meet your needs
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
                      backgroundColor: colorPalette.white,
                      color: colorPalette.greenDeep,
                    }}
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServicesPage;