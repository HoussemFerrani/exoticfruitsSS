"use client";

import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export default function HeroSection() {
  const { openModal } = useModal();
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }}
      >
        <source src="https://storage.googleapis.com/works23/ExoticFruits/1.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Heading */}
      <div className="relative z-20 w-full py-20 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16">
        <div className="max-w-2xl">
          <div className="text-left">
              {/* Prominent slogan */}
              <div>
                <span
                  className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-orange-400 drop-shadow-xl"
                  aria-label="Slogan: Premium Exotic Fruits"
                >
                  {t("hero.title")}
                </span>
              </div>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed font-light text-white drop-shadow-lg">
                {t("hero.subtitle")}
              </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Primary CTA - Explore Fruits */}
            <Link href="/products">
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  {t("hero.cta")}
                  <ArrowRight className="w-6 h-6 ml-1" />
                </span>
              </button>
            </Link>


          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div
            className="flex flex-col items-center cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            <span className="text-white/80 text-sm font-medium mb-2 group-hover:text-white transition-colors">
              {t("common.discoverMore")}
            </span>
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


