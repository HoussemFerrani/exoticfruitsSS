"use client";

import React, { useState, useRef, useEffect } from "react";
import { useI18n, type Locale } from "@/contexts/I18nContext";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGE_OPTIONS: Array<{ code: Locale; name: string; flag: string }> = [
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "Français", flag: "FR" },
];

export default function LanguageButton() {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGE_OPTIONS.find(lang => lang.code === locale);

  // Observe promotional banner for positioning
  useEffect(() => {
    if (typeof window === "undefined") return;

    const banner = document.getElementById("promotional-banner");

    function updateOffset() {
      if (banner) {
        const rect = banner.getBoundingClientRect();
        setBannerOffset(Math.ceil(rect.height));
      } else {
        setBannerOffset(0);
      }
    }

    updateOffset();

    const resizeObserver = new ResizeObserver(updateOffset);
    if (banner) resizeObserver.observe(banner);

    const mutationObserver = new MutationObserver(updateOffset);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        panelRef.current && !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  function selectLanguage(languageCode: Locale) {
    setLocale(languageCode);
    setIsOpen(false);
  }

  return (
    <>
      {/* Floating Language Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{ bottom: `${16 + bannerOffset}px` }}
        className="fixed right-4 z-50 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-12 w-12 flex items-center justify-center transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("general.selectLanguage")}
        title={`${t("general.selectLanguage")} - ${currentLanguage?.name}`}
      >
        <div className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          <span className="text-xs font-bold">{currentLanguage?.flag}</span>
        </div>
      </motion.button>

      {/* Language Selection Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ bottom: `${76 + bannerOffset}px` }}
            className="fixed right-4 z-40 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-brand)] text-white px-3 py-2">
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span className="font-medium text-xs">{t("general.selectLanguage")}</span>
              </div>
            </div>

            {/* Language Options */}
            <div className="p-1">
              {LANGUAGE_OPTIONS.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => selectLanguage(language.code)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-150 ${
                    locale === language.code
                      ? "bg-[var(--color-brand)] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    locale === language.code ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>{language.flag}</span>
                  <span className="flex-1 text-left font-medium text-xs">
                    {language.name}
                  </span>
                  {locale === language.code && (
                    <Check className="w-3 h-3" />
                  )}
                </motion.button>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}