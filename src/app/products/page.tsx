"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsGrid from "@/components/sections/ProductsGrid";
import { useI18n } from "@/contexts/I18nContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const { t, isLoading } = useI18n();

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Header />

      {/* Hero Section for Products Page */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
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
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                {t("productsPage.hero.subtitle")}
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg"
              >
                {t("productsPage.hero.title")}
              </h1>
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md backdrop-blur-sm bg-black/20 rounded-2xl p-6"
                style={{ color: "#FAB12F" }}
              >
                {t("productsPage.hero.description")}
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