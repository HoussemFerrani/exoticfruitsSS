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


      </div>
    </section>
  );
}


