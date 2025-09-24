"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Shield, Truck, MapPin, Calendar, Users, Heart, Leaf } from "lucide-react";

export default function AboutPage() {
  const COMPANY_VALUES = [
    {
      id: "01",
      title: "Quality First",
      description:
        "Advanced technology evaluates every fruit's maturity, firmness, density, and sugar content before export.",
      icon: Award
    },
    {
      id: "02",
      title: "Full Traceability",
      description:
        "Each shipment receives a unique code, ensuring complete transparency from Colombian farm to your market.",
      icon: Shield
    },
    {
      id: "03",
      title: "Certified Excellence",
      description:
        "Official phytosanitary certificates guarantee compliance with international food safety standards.",
      icon: Truck
    },
    {
      id: "04",
      title: "Sustainable Partnership",
      description:
        "Direct relationships with Colombian growers support sustainable farming practices and fair trade.",
      icon: Heart
    },
  ];

  const TIMELINE = [
    {
      year: "2018",
      title: "Foundation in Montreal",
      description: "Established our distribution center at 9600 Meilleur Street, creating a strategic hub for Canadian markets."
    },
    {
      year: "2019",
      title: "Colombian Partnerships",
      description: "Built direct relationships with premium fruit growers across Colombia's diverse agricultural regions."
    },
    {
      year: "2021",
      title: "Technology Integration",
      description: "Implemented advanced quality control systems for precise fruit evaluation and certification."
    },
    {
      year: "2024",
      title: "Market Expansion",
      description: "Serving specialized markets across Canada with consistent, high-quality exotic fruit distribution."
    }
  ];

  return (
    <main>
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/mango-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontFamily: "var(--font-family-base)"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About Us
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto font-light text-yellow-400"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            More than fruit - we deliver trust, authenticity, and the taste of Colombia
          </motion.p>

          <motion.div
            className="w-24 h-1 bg-orange-400 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
        </div>
      </section>

      <section
        id="about"
        aria-label="Our Story"
        className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-800 via-emerald-700 to-green-900 bg-clip-text text-transparent"
              style={{
                fontFamily: "var(--font-family-base)",
                letterSpacing: "-0.02em"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Our Story
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Video Section */}
            <motion.div
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1
              }}
            >
              <div className="relative">
                <motion.div
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/30"
                  initial={{ scale: 0.95, rotateY: -8 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.15)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-xl shadow-lg"
                  >
                    <source src="/video4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="lg:col-span-7 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
            >
              <div className="relative">
                <motion.div
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-white/30 space-y-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)"
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <motion.p
                    className="text-xl md:text-2xl font-semibold leading-relaxed bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    At Fruit Exotic International Inc by I Defense, every fruit begins with a story of passion and tradition.
                  </motion.p>

                  <motion.div
                    className="space-y-5 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="text-lg">
                      Our journey started in Colombia over seven years ago, with one mission in mind: to share the country's tropical treasures with the world.
                    </p>

                    <p className="text-lg">
                      Behind each mango, lime, or mangosteen are farmers who rise with the sun, working the soil with dedication and care. Their knowledge, passed down through generations, ensures that every fruit is grown naturally, harvested by hand, and nurtured with love for the land.
                    </p>

                    <p className="text-lg">
                      From these orchards, we continue the journey - carefully washing, sorting, and packing each fruit to meet the highest standards of quality. Today, our exports reach partners across Canada, Europe, and the Middle East, delivering freshness and authenticity in every box.
                    </p>
                  </motion.div>

                  <motion.p
                    className="text-lg font-semibold bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text text-transparent mt-6"
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    Our story is one of hard work, trust, and connection - from the fields of Colombia to tables around the world.
                  </motion.p>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-green-400/15 to-emerald-500/15 rounded-full blur-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent"
              style={{
                fontFamily: "var(--font-family-base)",
                letterSpacing: "-0.02em"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              What We Offer
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Services List - Alternating Layout */}
          <div className="relative space-y-10 md:space-y-14">
            {[
              {
                title: "Premium Exotic Fruits",
                subtitle: "from Colombia's finest harvests",
                description: "From baby mangoes and Palmer mangoes to limes, avocados, and mangosteens — we deliver Colombia's finest harvests, grown with care and picked at peak ripeness.",
                imagePlaceholder: "🥭",
                align: "right"
              },
              {
                title: "Custom Packaging Solutions",
                subtitle: "tailored to your market",
                description: "Your market is unique — and so is your packaging. We provide tailored formats, branding, and designs to match your exact needs.",
                imagePlaceholder: "📦",
                align: "left"
              },
              {
                title: "Reliable Export Logistics",
                subtitle: "worldwide delivery guaranteed",
                description: "Whether by weekly air cargo or full container loads, we ensure fast, flexible, and secure delivery worldwide.",
                imagePlaceholder: "✈️",
                align: "right"
              },
              {
                title: "Global Reach & Partnerships",
                subtitle: "connecting markets worldwide",
                description: "With trusted clients across Canada, Europe, and the Middle East, we connect Colombia's agricultural treasures to markets around the globe.",
                imagePlaceholder: "🌍",
                align: "left"
              }
            ].map((service, index) => (
              <div key={index} className="relative">
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {service.align === "right" ? (
                    <>
                      {/* Text First (Left) */}
                      <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                          {service.title}{" "}
                          <span className="italic text-orange-600">{service.subtitle}</span>
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                          {service.description}
                        </p>
                        {index === 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <Link
                              href="/products"
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300"
                            >
                              Check Our Products
                              <svg
                                className="ml-2 w-4 h-4"
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
                        )}
                      </motion.div>

                      {/* Image Second (Right) */}
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <div className="relative aspect-[5/4] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                          {index === 0 ? (
                            <Image
                              src="/mango.jpeg"
                              alt="Premium Exotic Fruits - Fresh Mangoes"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              className="object-cover"
                            />
                          ) : index === 2 ? (
                            <Image
                              src="/export.jpeg"
                              alt="Reliable Export Logistics - Shipping and Transportation"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                                  <span className="text-3xl">{service.imagePlaceholder}</span>
                                </div>
                                <p className="text-gray-500 font-medium">Image Placeholder</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Image First (Left) */}
                      <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <div className="relative aspect-[5/4] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                          {index === 1 ? (
                            <video
                              src="/video5.mp4"
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : index === 3 ? (
                            <Image
                              src="/farmer.jpeg"
                              alt="Global Reach & Partnerships - Colombian Farmers"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                                  <span className="text-3xl">{service.imagePlaceholder}</span>
                                </div>
                                <p className="text-gray-500 font-medium">Image Placeholder</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Text Second (Right) */}
                      <motion.div
                        className="flex flex-col justify-center order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                          {service.title}{" "}
                          <span className="italic text-orange-600">{service.subtitle}</span>
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                          {service.description}
                        </p>
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* Connecting Arrow */}
                {index < 3 && (
                  <motion.div
                    className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
                    style={{
                      top: "calc(100% + 1rem)",
                      height: "6rem",
                      zIndex: 10
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                    >
                      {/* Curved Arrow Path */}
                      <motion.path
                        d={
                          service.align === "left"
                            ? "M 50 8 Q 75 25 65 50 Q 58 75 30 85"  // Curve right to left
                            : "M 50 8 Q 25 25 35 50 Q 42 75 70 85"   // Curve left to right
                        }
                        stroke="#f97316"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="250"
                        initial={{ strokeDashoffset: 250 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                      />

                      {/* Arrow Head - Filled Triangle */}
                      <motion.path
                        d={
                          service.align === "left"
                            ? "M 30 85 L 25 78 L 35 82 L 38 90 Z"  // Filled arrow pointing down-left
                            : "M 70 85 L 75 78 L 65 82 L 62 90 Z"   // Filled arrow pointing down-right
                        }
                        fill="#f97316"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: 1.3 }}
                      />

                      {/* Enhanced Arrow Head Shadow */}
                      <motion.path
                        d={
                          service.align === "left"
                            ? "M 32 87 L 27 80 L 37 84 L 40 92 Z"  // Shadow offset
                            : "M 72 87 L 77 80 L 67 84 L 64 92 Z"
                        }
                        fill="#ea580c"
                        opacity="0.3"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.3, scale: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: 1.3 }}
                      />

                      {/* Starting point indicator */}
                      <motion.circle
                        cx="50"
                        cy="8"
                        r="3"
                        fill="#f97316"
                        stroke="#ffffff"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontFamily: "var(--font-family-base)",
                letterSpacing: "-0.02em"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Quality Certifications
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-white mx-auto rounded-full shadow-lg"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Certification Content */}
          <div>
            {/* Certificate Text */}
            <motion.p
              className="text-lg md:text-xl text-white leading-relaxed text-center"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Each export shipment from <span className="font-bold">Fruits Exotics International Inc. By I Defense</span> is accompanied by an official phytosanitary certificate. This ensures that every fruit we deliver strictly complies with international food safety standards, giving our clients confidence in the quality, safety, and authenticity of our products.
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}