"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import WhyWhoSection from "@/components/sections/WhyWhoSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layout/Footer";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import Link from "next/link";
import { motion } from "framer-motion";

// Component that handles search params (auth removed for frontend-only deployment)
function SearchParamsHandler() {
  return null;
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      <Header />
      <HeroSection />
      <AboutUsSection />

      {/* Product Slider Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
              Our Premium Exotic Fruits
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the amazing variety of fresh exotic fruits we import directly from Colombia
            </p>
          </div>

          {/* Infinite Slider */}
          <div className="mb-12">
            <InfiniteSlider
              images={[
                "/papaya.png",
                "/dragon-fruit.png",
                "/physalis.png",
                "/Mangosteen.png",
                "/banana.png",
                "/avocado.png",
                "/lime.png",
                "/tamarillo.png",
                "/COROSSOL.png",
                "/Curuba.png",
                "/Feijoa.png",
                "/apple.png"
              ]}
              backgrounds={["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"]}
              durationSeconds={40}
              itemSize={160}
              gap={80}
            />
          </div>

          {/* View All Products Button */}
          <div className="text-center">
            <Link href="/products">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  View All Products
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <WhyWhoSection />
      <CoreValuesSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
