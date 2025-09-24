"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsGrid from "@/components/sections/ProductsGrid";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  // Background images for sliding effect - using fruit images
  const backgroundImages = [
    "/background1.jpg",
    "/background2.jpg",
    "/background3.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <main>
      <Header />

      {/* Hero Section for Products Page */}
      <section className="relative pt-20 pb-24 min-h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {backgroundImages.map((imageSrc, index) => {
            let xPosition = "100%"; // Default: off-screen right

            if (index === currentImageIndex) {
              xPosition = "0%"; // Current: center
            } else if (index === (currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length) {
              xPosition = "-100%"; // Previous: off-screen left
            }

            return (
              <motion.div
                key={imageSrc}
                className="absolute inset-0"
                initial={{ x: index === 0 ? "0%" : "100%" }}
                animate={{ x: xPosition }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
              >
                <Image
                  src={imageSrc}
                  alt="Background fruit"
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-wide mb-4 drop-shadow-lg"
                style={{ color: "#FAB12F" }}
              >
                Premium Quality
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg"
              >
                Our Products
              </h1>
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                style={{ color: "#FAB12F" }}
              >
                Discover our premium selection of exotic and tropical fruits,
                carefully sourced from the finest farms around the world. From
                classic tropicals to rare varieties, we bring you the freshest
                and most flavorful fruits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Products Section */}
      <ProductsGrid />

      <Footer />
    </main>
  );
}