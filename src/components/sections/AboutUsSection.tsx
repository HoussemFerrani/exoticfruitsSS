"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";

export default function AboutUsSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  return (
    <section ref={ref} id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content - Left Side */}
          <div className="order-2 md:order-1">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                fontFamily: "var(--font-family-base)"
              }}
            >
              {t("aboutUs.title")}
            </h2>

            <div className="w-24 h-1 bg-orange-400 mb-8 rounded-full" />

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-green-800">{t("aboutUs.company")}</span> {t("aboutUs.description1")}
              </p>

              <p>
                {t("aboutUs.description2")}
              </p>
            </div>

            <div className="mt-8">
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
            </div>
          </div>

          {/* Image Collage - Right Side */}
          <div className="order-1 md:order-2">
            <div className="relative h-[450px] w-full">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-3xl opacity-50 blur-lg" />

              {/* Main large image - Left side */}
              <div className="absolute left-0 top-0 w-[60%] h-[100%] overflow-hidden rounded-3xl shadow-xl hover:scale-102 transition-transform duration-300">
                <Image
                  src="/about.jpeg"
                  alt="Fresh exotic fruits from Colombia"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Top right image - Truck */}
              <div className="absolute right-0 top-0 w-[38%] h-[48%] overflow-hidden rounded-2xl shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-300">
                <Image
                  src="/truck.jpeg"
                  alt="Truck delivering fruits"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 38vw, 19vw"
                />
              </div>

              {/* Bottom right image - Factory */}
              <div className="absolute right-0 bottom-0 w-[38%] h-[48%] overflow-hidden rounded-2xl shadow-lg hover:scale-105 hover:-rotate-1 transition-all duration-300">
                <Image
                  src="/factory.jpeg"
                  alt="Processing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 38vw, 19vw"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}