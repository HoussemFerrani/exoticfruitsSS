"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LogoQuoteSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="/logo  fruit exotic.png"
                alt="Fruit Exotic International Logo"
                width={200}
                height={200}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Decorative Elements */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 italic leading-relaxed text-center"
                >
                  Quality harvested with care, delivered with passion
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mx-auto mt-4 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}