"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Plus, Minus, HelpCircle, MessageCircle, CircleHelp } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import HandwrittenArrow from "@/components/ui/HandwrittenArrow";

const FAQ_DATA = [
  {
    id: 1,
    questionKey: "faq.questions.1.question" as const,
    answerKey: "faq.questions.1.answer" as const,
  },
  {
    id: 2,
    questionKey: "faq.questions.2.question" as const,
    answerKey: "faq.questions.2.answer" as const,
  },
  {
    id: 3,
    questionKey: "faq.questions.3.question" as const,
    answerKey: "faq.questions.3.answer" as const,
  },
  {
    id: 4,
    questionKey: "faq.questions.4.question" as const,
    answerKey: "faq.questions.4.answer" as const,
  },
  {
    id: 5,
    questionKey: "faq.questions.5.question" as const,
    answerKey: "faq.questions.5.answer" as const,
  },
  {
    id: 6,
    questionKey: "faq.questions.6.question" as const,
    answerKey: "faq.questions.6.answer" as const,
  }
];

export default function FAQSection() {
  const { t } = useI18n();
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Left arrow pointing to heading */}
          <div className="absolute left-4 md:left-8 lg:left-12 top-0 hidden md:block">
            <HandwrittenArrow
              direction="right"
              size={140}
              delay={0.8}
              color="#FAB12F"
            />
          </div>

          {/* Right arrow pointing to heading */}
          <div className="absolute right-4 md:right-8 lg:right-12 top-0 hidden md:block">
            <HandwrittenArrow
              direction="left"
              size={140}
              delay={1.0}
              color="#FAB12F"
            />
          </div>

          {/* FAQ Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-xl mb-6 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut"
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background ripple */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <HelpCircle className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              letterSpacing: "-0.02em"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            {t("faq.title")}
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut"
            }}
          />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.25)",
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            >
              <motion.button
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                onClick={() => toggleItem(item.id)}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-green-800 pr-6 leading-relaxed">
                  {t(item.questionKey)}
                </h3>

                <motion.div
                  className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {openItem === item.id ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent mb-4"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {t(item.answerKey)}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-white/30 max-w-3xl mx-auto"
            whileHover={{
              y: -5,
              boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.4 }
            }}
          >
            <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">
              {t("faq.cta.title")}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 max-w-xl mx-auto">
              {t("faq.cta.description")}
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -8px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {t("faq.cta.button")}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}