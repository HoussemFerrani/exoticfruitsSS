"use client";

import { motion } from "framer-motion";
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
        <source src="/hero-fruits-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Heading */}
      <div className="relative z-20 w-full py-20 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16">
        <div className="max-w-2xl">
          <div className="text-left">
              {/* Prominent slogan */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              >
                <span
                  className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-orange-400 drop-shadow-xl"
                  aria-label="Slogan: Premium Exotic Fruits"
                >
                  {t("hero.title")}
                </span>
              </motion.div>
              <motion.p
                className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed font-light text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                {t("hero.subtitle")}
              </motion.p>
          </div>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {/* Primary CTA - Explore Fruits */}
            <Link href="/products">
              <motion.button
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
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
                  {t("hero.cta")}
                  <motion.div
                    className="overflow-hidden"
                    initial={{ width: 0 }}
                    whileHover={{ width: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6 ml-1" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>


          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
            whileHover={{ y: -4 }}
          >
            <span className="text-white/80 text-sm font-medium mb-2 group-hover:text-white transition-colors">
              {t("common.discoverMore")}
            </span>
            <motion.div
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}


