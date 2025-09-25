"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import HandwrittenArrow from "@/components/ui/HandwrittenArrow";

const PARTNERS = [

  
  {
    id: "partner-4",
    name: "Canada Wide Fruits",
    description: "Premier Canadian fruit distributor specializing in fresh exotic and tropical fruits with nationwide delivery network",
    website: "https://www.canadawidefruits.com/",
    logo: "/canadawide.png",
    location: "Canada",
    specialties: ["Nationwide Distribution", "Fresh Delivery", "Quality Assurance"]
  },
  {
    id: "partner-5",
    name: "Thomas Fruits",
    description: "French premium fruit distributor specializing in high-quality exotic and tropical fruits",
    website: "https://www.thomasfruits.com/fr",
    logo: "/thomasfruits.png",
    location: "France",
    specialties: ["Premium Quality", "European Distribution", "Exotic Specialties"]
  },
  {
    id: "partner-6",
    name: "Gaëtan Bono",
    description: "Premium fruit specialist and gourmet food distributor",
    website: "https://gaetanbono.com/en/",
    logo: "/gaetanbono.png",
    location: "France",
    specialties: ["Gourmet Selection", "Premium Service", "Fine Food Distribution"]
  },
  {
    id: "partner-7",
    name: "Chenail",
    description: "Canadian fresh produce distributor",
    website: "https://chenail.ca/",
    logo: "/chenail.png",
    location: "Canada",
    specialties: ["Fresh Produce", "Canadian Market", "Quality Distribution"]
  },
  {
    id: "partner-8",
    name: "IGA",
    description: "Leading Canadian grocery retailer",
    website: "https://www.iga.com/",
    logo: "/iga.svg",
    location: "Canada",
    specialties: ["Retail Excellence", "Fresh Groceries", "Community Focus"]
  },
  {
    id: "partner-9",
    name: "Le Pro 1600",
    description: "Professional food service distributor",
    website: "https://lepro1600.com/en",
    logo: "/lepro1600.png",
    location: "Canada",
    specialties: ["Food Service", "Professional Distribution", "Restaurant Supply"]
  },
];

// Mapping function to convert hardcoded specialties to translation keys
const getSpecialtyTranslationKey = (specialty: string): string => {
  const specialtyMap: Record<string, string> = {
    "Nationwide Distribution": "specialties.nationwideDistribution",
    "Fresh Delivery": "specialties.freshDelivery",
    "Quality Assurance": "specialties.qualityAssurance",
    "Premium Quality": "specialties.premiumQuality",
    "European Distribution": "specialties.europeanDistribution",
    "Exotic Specialties": "specialties.exoticSpecialties",
    "Gourmet Selection": "specialties.gourmetSelection",
    "Premium Service": "specialties.premiumService",
    "Fine Food Distribution": "specialties.fineFoodDistribution",
    "Fresh Produce": "specialties.freshProduce",
    "Canadian Market": "specialties.canadianMarket",
    "Quality Distribution": "specialties.qualityDistribution",
    "Retail Excellence": "specialties.retailExcellence",
    "Fresh Groceries": "specialties.freshGroceries",
    "Community Focus": "specialties.communityFocus",
    "Food Service": "specialties.foodService",
    "Professional Distribution": "specialties.professionalDistribution",
    "Restaurant Supply": "specialties.restaurantSupply"
  };

  return specialtyMap[specialty] || specialty;
};

export default function PartnersSection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const partnersPerSlide = 2;
  const totalSlides = Math.ceil(PARTNERS.length / partnersPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentPartners = () => {
    const startIndex = currentIndex * partnersPerSlide;
    return PARTNERS.slice(startIndex, startIndex + partnersPerSlide);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Left arrow pointing to heading */}
          <div className="absolute left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
            <HandwrittenArrow
              direction="right"
              size={140}
              delay={0.8}
              color="#22c55e"
            />
          </div>

          {/* Right arrow pointing to heading */}
          <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
            <HandwrittenArrow
              direction="left"
              size={140}
              delay={1.0}
              color="#22c55e"
            />
          </div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              color: "#FAB12F",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              fontFamily: "var(--font-family-base)",
              letterSpacing: "-0.02em"
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {t("partners.title")}
          </motion.h2>

          <motion.div
            className="w-16 h-0.5 mx-auto rounded-full mb-6"
            style={{ backgroundColor: "#FAB12F" }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {t("partners.description")}
          </motion.p>
        </motion.div>


        {/* Partners Slider */}
        <div className="relative z-10">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500"
            style={{ color: "#FAB12F" }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500"
            style={{ color: "#FAB12F" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Slider Container */}
          <div className="mx-12">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCurrentPartners().map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border"
                      style={{ borderColor: "#FAB12F40" }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                        transition: { duration: 0.4 }
                      }}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    >
                      {/* Partner Logo Section */}
                      <div className="p-6 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center justify-center h-20 mb-4">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                width={180}
                                height={80}
                                className="max-w-full max-h-full object-contain filter hover:brightness-110 transition-all duration-300"
                                style={{ width: "auto", height: "auto" }}
                                priority
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Partner Info */}
                      <div className="p-4">
                        {/* Specialties */}
                        <motion.div
                          className="mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-center" style={{ color: "#FAB12F" }}>
                            {t("partners.specialties")}
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {partner.specialties.map((specialty, idx) => (
                              <motion.span
                                key={idx}
                                className="px-3 py-1 text-sm rounded-full font-medium"
                                style={{ backgroundColor: "#FAB12F20", color: "#FAB12F" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {t(getSpecialtyTranslationKey(specialty) as any)}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Visit Website Button */}
                        <motion.div
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <motion.a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300"
                            style={{ backgroundColor: "#FAB12F" }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "#E09B1A",
                              boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {t("partners.learnMore")}
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <motion.div
            className="flex justify-center mt-6 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gray-300 hover:bg-gray-400"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                style={{
                  backgroundColor: index === currentIndex ? "#FAB12F" : "#d1d5db"
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: index === currentIndex ? 1.3 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Partnership CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="rounded-xl p-4 md:p-6 text-white max-w-3xl mx-auto"
            style={{ backgroundColor: "#FAB12F" }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.4 }
            }}
          >
            <motion.h3
              className="text-xl md:text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t("partners.cta.title")}
            </motion.h3>
            <motion.p
              className="text-base mb-4 opacity-90 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t("partners.cta.description")}
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-all duration-300"
              style={{ color: "#FAB12F" }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f9fafb",
                boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t("partners.cta.button")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}