"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/contexts/I18nContext";

const coreValues = [
  {
    id: 1,
    titleKey: "coreValues.qualityFirst.title",
    image: "/qualityy.png"
  },
  {
    id: 2,
    titleKey: "coreValues.reliableLogistics.title",
    image: "/fruit3.png"
  },
  {
    id: 3,
    titleKey: "coreValues.sustainability.title",
    image: "/fruit1.png"
  },
  {
    id: 4,
    titleKey: "coreValues.strongPartnerships.title",
    image: "/handshake.png"
  }
];

export default function CoreValuesSection() {
  const { t } = useI18n();

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Purple Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #6A0066 0%, #7A1677 25%, #8A2688 50%, #9A3699 75%, #AA46AA 100%)"
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-300 mb-4"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              fontFamily: "var(--font-family-base)"
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {t("coreValues.title")}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-yellow-300 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.id}
              className="flex flex-col items-center text-center group cursor-pointer"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotateY: index % 2 === 0 ? -15 : 15
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{
                scale: 1.08,
                y: -8,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
              }}
            >
              {/* Circular Image Container */}
              <div className="relative mb-6">
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm relative"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    borderColor: "rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Fruit Images */}
                  <Image
                    src={value.image}
                    alt={t(value.titleKey as any)}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className={`transition-transform duration-300 group-hover:scale-110 ${
                      value.image === "/handshake.png" || value.image === "/truck.png"
                        ? "object-contain p-4"
                        : "object-cover group-hover:rotate-12"
                    }`}
                    priority
                  />

                </motion.div>

                {/* Decorative Ring */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-yellow-300/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Value Title */}
              <motion.h3
                className="text-xl md:text-2xl font-bold text-white mb-4"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15 + 0.6,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
                }}
              >
                {t(value.titleKey as any)}
              </motion.h3>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}