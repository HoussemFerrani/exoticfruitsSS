"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

export default function AboutUsSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content - Left Side */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 50
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                fontFamily: "var(--font-family-base)"
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 60
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {t("aboutUs.title")}
            </motion.h2>

            <motion.div
              className="w-24 h-1 bg-orange-400 mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isVisible ? 1 : 0
              }}
              style={{ originX: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />

            <motion.div
              className="space-y-6 text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 40
              }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 30
                }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className="font-semibold text-green-800">{t("aboutUs.company")}</span> {t("aboutUs.description1")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 30
                }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {t("aboutUs.description2")}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 30
              }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              className="mt-8"
            >
              <Link
                href="/apropre"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {t("aboutUs.learnMore")}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Collage - Right Side */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : 100
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative h-[450px] w-full">
              {/* Decorative background */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-3xl opacity-50 blur-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 0.5 : 0,
                  scale: isVisible ? 1 : 0.8
                }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />

              {/* Main large image - Left side */}
              <motion.div
                className="absolute left-0 top-0 w-[60%] h-[100%] overflow-hidden rounded-3xl shadow-xl"
                initial={{ opacity: 0, x: 80, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 80,
                  scale: isVisible ? 1 : 0.8
                }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/about.jpeg"
                  alt="Fresh exotic fruits from Colombia"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </motion.div>

              {/* Top right image - Truck */}
              <motion.div
                className="absolute right-0 top-0 w-[38%] h-[48%] overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 120, y: -30, rotate: -15 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 120,
                  y: isVisible ? 0 : -30,
                  rotate: isVisible ? 0 : -15
                }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/truck.jpeg"
                  alt="Truck delivering fruits"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 38vw, 19vw"
                />
              </motion.div>

              {/* Bottom right image - Factory */}
              <motion.div
                className="absolute right-0 bottom-0 w-[38%] h-[48%] overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 120, y: 30, rotate: 15 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 120,
                  y: isVisible ? 0 : 30,
                  rotate: isVisible ? 0 : 15
                }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/factory.jpeg"
                  alt="Processing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 38vw, 19vw"
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}