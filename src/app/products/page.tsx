'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import products from '@/utils/products.json';
import { colorPalette } from '@/utils/variables';

interface Product {
  id: number;
  title: string;
  description: string;
  'main-image': string;
}

// Convert Google Drive share link to direct image URL
const convertGoogleDriveUrl = (shareUrl: string): string => {
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : shareUrl;
};

const ProductsPage: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${colorPalette.whiteMint} 0%, ${colorPalette.green7} 50%, ${colorPalette.whiteSoft} 100%)` 
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: colorPalette.green3 }}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5"
          style={{ backgroundColor: colorPalette.greenJade }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${colorPalette.green2} 0%, ${colorPalette.green3} 50%, ${colorPalette.greenJade} 100%)` 
            }}
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
            style={{ color: colorPalette.green2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover our cutting-edge drone solutions designed to transform industries and push the boundaries of aerial technology
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="space-y-16 md:space-y-24"
        >
          {products.map((product: Product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {/* Image Section */}
              <motion.div 
                className={`w-full lg:w-1/2 relative ${
                  index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
                variants={imageVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  />
                  <motion.div
                    animate={activeProduct === product.id ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="aspect-[16/10] sm:aspect-[4/3] relative"
                  >
                    <Image
                      src={convertGoogleDriveUrl(product['main-image'])}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </motion.div>
                  
                  {/* Overlay gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10"
                  />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className={`w-full lg:w-1/2 space-y-6 md:space-y-8 ${
                  index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
                initial={{ x: index % 2 === 1 ? 50 : -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
                  style={{ color: colorPalette.green2 }}
                  whileInView={{ y: [20, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {product.title}
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl leading-relaxed"
                  style={{ color: colorPalette.grayDark }}
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {product.description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
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
                        backgroundColor: colorPalette.green3,
                        color: colorPalette.white,
                        border: `2px solid ${colorPalette.green3}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colorPalette.green2;
                        e.currentTarget.style.borderColor = colorPalette.green2;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colorPalette.green3;
                        e.currentTarget.style.borderColor = colorPalette.green3;
                      }}
                    >
                      Know More
                      <motion.svg
                        className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={`/contact?type=drone&id=${product.id}`}
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      style={{ 
                        backgroundColor: 'transparent',
                        color: colorPalette.green3,
                        border: `2px solid ${colorPalette.green3}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colorPalette.green3;
                        e.currentTarget.style.color = colorPalette.white;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colorPalette.green3;
                      }}
                    >
                      Order Now
                      <motion.svg
                        className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5 0h6" />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-24 md:mt-32 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-6 md:p-8 rounded-3xl shadow-2xl max-w-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${colorPalette.green2} 0%, ${colorPalette.green3} 100%)`,
              color: colorPalette.white
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Custom Solution?</h3>
            <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">Let&apos;s discuss how we can build the perfect drone for your specific needs</p>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact?type=drone"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: colorPalette.white,
                  color: colorPalette.green2
                }}
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;