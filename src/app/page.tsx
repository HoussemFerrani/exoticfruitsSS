"use client";

import { Suspense, useEffect, useState } from "react";
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
import { useI18n } from "@/contexts/I18nContext";
import TranslatedText from "@/components/ui/TranslatedText";
import { useHydrationSafeTranslation } from "@/hooks/useHydrationSafeTranslation";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Component that handles search params (auth removed for frontend-only deployment)
function SearchParamsHandler() {
  return null;
}

export default function Home() {
  const { t, locale, isHydrated, isLoading } = useI18n();
  const { ht } = useHydrationSafeTranslation();
  const [windowLoaded, setWindowLoaded] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  // Track window load (fonts, images, etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onLoad = () => setWindowLoaded(true);
    if (document.readyState === "complete") {
      setWindowLoaded(true);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Hide loader once hydrated, translations ready, and window loaded
  useEffect(() => {
    if (isHydrated && !isLoading && windowLoaded) {
      const timeout = setTimeout(() => setShowLoader(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isHydrated, isLoading, windowLoaded]);

  if (showLoader) {
    return <LoadingScreen message={isLoading ? "Loading..." : (t("common.loading") || undefined)} />;
  }

  return (
    <main key={isHydrated ? locale : 'default'}>
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
              {ht("products.sliderTitle", "Our Premium Exotic Fruits")}
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {ht("products.sliderDescription", "Discover the amazing variety of fresh exotic fruits we import directly from Colombia")}
            </p>
          </div>

          {/* Infinite Slider */}
          <div className="mb-12">
            <InfiniteSlider className=""
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
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  {ht("common.exploreButton", "View All Products")}
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
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
