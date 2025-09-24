"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function WhyWhoSection() {
  const { t } = useI18n();

  return (
    <section className="relative pt-16 md:pt-20 lg:pt-24 pb-32 md:pb-36 lg:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative dashed arcs */}
        <motion.svg
          className="pointer-events-none absolute -top-20 left-[25%] w-[680px] md:w-[760px] lg:w-[880px] opacity-30 origin-center"
          viewBox="0 0 880 240"
          fill="none"
          initial={{ rotate: 15 }}
          animate={{ rotate: [15, 19, 15] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          <defs>
            <marker id="arcArrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          <motion.path
            d="M40 220C120 80 260 20 380 20C500 20 640 80 720 220"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -64] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ color: "var(--color-cta)" }}
          />
        </motion.svg>

        <motion.svg
          className="pointer-events-none absolute -bottom-40 left-[15%] w-[680px] md:w-[760px] lg:w-[880px] opacity-30 origin-center"
          viewBox="0 0 880 240"
          fill="none"
          initial={{ rotate: 15 }}
          animate={{ rotate: [15, 11, 15] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          <motion.path
            d="M40 20C120 160 260 220 380 220C500 220 640 160 720 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, 64] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ color: "var(--color-cta)" }}
          />
        </motion.svg>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            className="max-w-[560px] justify-self-start relative group"
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
              {t("mission.title")}
            </p>
            <h3
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight transition-colors duration-300"
              style={{ color: "var(--color-brand)" }}
            >
              {t("mission.heading")}
            </h3>
            <div
              className="mt-5 text-[15px] md:text-base leading-relaxed text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              <p>
                {t("mission.description1")}
              </p>
              <p className="mt-4">
                {t("mission.description2")}
              </p>
              <p className="mt-4">
                {t("mission.description3")}
              </p>
            </div>
          </motion.div>

          {/* Who We Serve */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            whileHover={{ y: -2 }}
            className="max-w-[560px] justify-self-start md:mt-33 lg:mt-45 relative group"
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
              {t("whoWeServe.title")}
            </p>
            <h3
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight transition-colors duration-300"
              style={{ color: "var(--color-brand)" }}
            >
              {t("whoWeServe.heading")}
            </h3>
            <div
              className="mt-5 text-[15px] md:text-base leading-relaxed text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              <p>
                {t("whoWeServe.description1")}
              </p>
              <p className="mt-4">
                {t("whoWeServe.description2")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}


