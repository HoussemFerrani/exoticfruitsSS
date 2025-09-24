"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Us"
      className="relative py-16 md:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center">
          {/* Image block with framed accent */}
          <div className="relative w-full md:max-w-[380px] lg:max-w-[400px] justify-self-center md:justify-self-start order-2 md:order-1 mb-8 md:mb-0 md:ml-10 lg:ml-14">
            {/* Accent rounded frame behind the image */}
            <div
              className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-[2.25rem] md:rounded-[3.5rem] border-[6px] sm:border-[8px] md:border-[10px] opacity-60"
              style={{ borderColor: "var(--color-clay)" }}
              aria-hidden="true"
            />

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: 0 }}
              className="group relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <Image
                src="/AboutSection.pg"
                alt="Exotic fruits from tropical farms"
                width={1000}
                height={1400}
                className="w-full h-auto object-cover object-center origin-center transition-transform duration-300 group-hover:scale-105 will-change-transform"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </motion.figure>
          </div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="relative order-1 md:order-2"
          >
            <p className="text-sm font-semibold tracking-wide">
              <span style={{ color: "var(--color-cta)" }}>Fruit Exotic International </span>
            </p>
            <h2
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              From Farm to Market
            </h2>

            <div
              className="mt-4 space-y-3 text-[15px] md:text-base leading-relaxed text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              {/* Encadré storytelling */}
              <div
                className="relative rounded-2xl p-5 sm:p-6 ring-1 ring-black/5 shadow-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
                }}
                aria-label="Our Story: Global Fruit Network"
              >
                <div
                  className="absolute -inset-px rounded-[inherit] pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "var(--color-mint)",
                      color: "var(--color-brand)",
                    }}
                  >
                    Our Story
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    Global Network
                  </span>
                </div>
                <p style={{ color: "var(--color-text)" }}>
                  Founded by passionate fruit specialists,{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    Fruit Exotic International
                  </span>
                  {" "}bridges the gap between tropical fruit growers and premium retailers worldwide. After years of traveling through{" "}
                  <span className="font-semibold">tropical regions</span>,
                  we discovered the incredible diversity and quality of exotic fruits that rarely reach global markets. This inspired us to create a network that brings these treasures directly to discerning customers.
                </p>
                <div
                  className="mt-3 space-y-3"
                  style={{ color: "var(--color-text)" }}
                >
                  <p>
                    In a world where quality often gets lost in mass production, we bring back what matters: authentic relationships with growers, rigorous quality standards, and a commitment to sustainable farming practices. We work directly with passionate farmers to ensure every fruit meets our premium standards.
                  </p>
                  <p>
                    Whether you're sourcing dragon fruits from Vietnam, passion fruits from Colombia, or rambutans from Thailand, Fruit Exotic International ensures freshness, quality, and authenticity in every shipment.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative signature-like squiggle in the corner */}
            <svg
              className="pointer-events-none absolute -bottom-4 right-0 w-40 md:w-56 opacity-25"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 60 C 40 10, 80 110, 110 30 C 130 -10, 160 120, 190 20"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--color-muted)" }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


