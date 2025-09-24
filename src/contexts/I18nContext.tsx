"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "fr" | "es" | "ar" | "ru";

type TranslationKey = string;

type Translations = Record<string, any>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  isLoading: boolean;
  isRTL: boolean;
  dir: "ltr" | "rtl";
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale = "en" }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Record<Locale, Translations>>({
    en: {},
    fr: {},
    es: {},
    ar: {},
    ru: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // RTL languages
  const rtlLanguages: Locale[] = ["ar"];
  const isRTL = rtlLanguages.includes(locale);
  const dir = isRTL ? "rtl" : "ltr";

  // Load translations from JSON files
  const loadTranslations = async (lang: Locale) => {
    try {
      const response = await fetch(`/locales/${lang}/common.json?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(prev => {
          const newTranslations = {
            ...prev,
            [lang]: data
          };
          return newTranslations;
        });
        return true;
      } else {
        console.warn(`Failed to load translations for ${lang}`);
        return false;
      }
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      return false;
    }
  };

  // Load saved locale from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("exoticfruits-locale") as Locale;
      if (savedLocale && ["en", "fr", "es", "ar", "ru"].includes(savedLocale)) {
        setLocale(savedLocale);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0] as Locale;
        if (["en", "fr", "es", "ar", "ru"].includes(browserLang)) {
          setLocale(browserLang);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    const loadInitialTranslations = async () => {
      setIsLoading(true);
      
      // Always load English as fallback first
      await loadTranslations("en");
      
      // Load the selected locale if it's not English
      if (locale !== "en") {
        await loadTranslations(locale);
      }
      
      setIsLoading(false);
    };

    loadInitialTranslations();
  }, [locale]);

  // Save locale to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("exoticfruits-locale", locale);
    }
  }, [locale]);

  // Helper function to get nested object value by dot notation
  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const t = (key: TranslationKey): string => {
    // Try to get translation from current locale
    const currentTranslation = getNestedValue(translations[locale], key);
    if (currentTranslation !== undefined) {
      return currentTranslation;
    }

    // Fallback to English
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) {
      return englishTranslation;
    }

    // Return the key if no translation found
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  // Update document direction when locale changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
    }
  }, [locale, dir]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isLoading, isRTL, dir, isHydrated }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export type { Locale, TranslationKey };