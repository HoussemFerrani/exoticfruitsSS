"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "../providers/ModalProvider";

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { isModalOpen } = useModal();

  // Check sessionStorage on component mount to determine if banner was previously closed
  useEffect(() => {
    const bannerClosed = sessionStorage.getItem('promotional-banner-closed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Function to handle closing the banner and storing the state
  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promotional-banner-closed', 'true');
  };

  // The banner is positioned fixed at the bottom and should overlay content.
  // No body padding adjustments are needed to avoid layout shifts when it opens/closes.

  if (!isVisible || isModalOpen) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      id="promotional-banner"
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-700/60 text-white overflow-hidden z-[60] backdrop-blur-md"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-white/10 rounded-full translate-y-8 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          {/* Main content */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Launch badge */}
            <div className="self-start sm:self-auto bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 ring-1 ring-white/10">
              🚀 Lancement Officiel
            </div>

            {/* Main message */}
            <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
              <span className="font-semibold">🎉 OFFRE EXCLUSIVE :</span>
              <span className="font-bold text-indigo-300">25% de rabais</span>
              <span>pour les 100 premiers clients !</span>
            </div>
          </div>

          {/* Desktop CTA and close button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-slate-900 px-3.5 py-1 rounded-full text-xs font-bold hover:bg-white/90 transition-colors cursor-pointer shadow-sm"
            >
              Réserver maintenant
            </button>
            <button
              onClick={handleClose}
              aria-label="Close promotional banner"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile CTA and close button */}
        <div className="sm:hidden flex items-center justify-between mt-3">
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 bg-white text-slate-900 px-3.5 py-1 rounded-full text-xs font-bold hover:bg-white/90 transition-colors cursor-pointer shadow-sm mr-3"
          >
            Réserver maintenant
          </button>
          <button
            onClick={handleClose}
            aria-label="Close promotional banner"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Close button will be rendered inside the main row (flex) so it flows responsively */}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 30, ease: "linear" }}
          className="h-full bg-indigo-400/80"
        />
      </div>
    </motion.div>
  );
}
