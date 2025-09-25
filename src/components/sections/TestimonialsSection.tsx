"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import HandwrittenArrow from "@/components/ui/HandwrittenArrow";

type Testimonial = {
  id: string;
  quoteKey: string;
  authorKey: string;
  metaKey: string;
  avatarSrc: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "thomas-fruits",
    quoteKey: "testimonials.thomasFruits.quote",
    authorKey: "testimonials.thomasFruits.author",
    metaKey: "testimonials.thomasFruits.meta",
    avatarSrc: "/thomasfruits.png",
  },
  {
    id: "iga",
    quoteKey: "testimonials.iga.quote",
    authorKey: "testimonials.iga.author",
    metaKey: "testimonials.iga.meta",
    avatarSrc: "/iga.svg",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={`star-${i}`}
          className="text-lg"
          style={{ color: "#FAB12F" }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.4,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.2, rotate: 360 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <section id="temoignages" aria-label="Témoignages" className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-yellow-300/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 relative"
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
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
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
            {t("testimonials.title")}
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
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-muted)" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch max-w-4xl mx-auto">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.figure
              key={testimonial.id}
              className="rounded-2xl p-6 ring-1 shadow-lg bg-white h-full flex flex-col"
              style={{ borderColor: "#FAB12F40" }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                ease: "easeOut"
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.4 }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
              >
                <Stars />
              </motion.div>
              <motion.blockquote
                className="mt-3 text-[15px] md:text-base leading-relaxed flex-1"
                style={{ color: "var(--color-text)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
              >
                "{t(testimonial.quoteKey as any)}"
              </motion.blockquote>
              <motion.figcaption
                className="mt-5 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 0.4 }}
              >
                <motion.div
                  className="relative h-10 w-16 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={testimonial.avatarSrc}
                    alt={t(testimonial.authorKey as any)}
                    width={64}
                    height={40}
                    className="object-contain max-w-full max-h-full"
                    style={{ width: "auto", height: "auto" }}
                    sizes="64px"
                  />
                </motion.div>
                <div>
                  <motion.div
                    className="font-semibold"
                    style={{ color: "#FAB12F" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {t(testimonial.authorKey as any)}
                  </motion.div>
                  <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                    {t(testimonial.metaKey as any)}
                  </div>
                </div>
              </motion.figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}


