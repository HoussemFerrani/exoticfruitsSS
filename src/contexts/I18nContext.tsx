"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "fr" | "es" | "ar" | "ru" | "pt" | "ur";

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

// Module-level in-memory cache so translations persist across renders and route changes
const translationsCache: Partial<Record<Locale, Translations>> = {};

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
    ru: {},
    pt: {},
    ur: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // RTL languages
  const rtlLanguages: Locale[] = ["ar", "ur"];
  const isRTL = rtlLanguages.includes(locale);
  const dir = isRTL ? "rtl" : "ltr";

  // Load translations from JSON files
  const loadTranslations = async (lang: Locale) => {
    // Serve from cache if available
    if (translationsCache[lang]) {
      setTranslations(prev => ({
        ...prev,
        [lang]: translationsCache[lang] as Translations
      }));
      return true;
    }

    try {
      const response = await fetch(`/locales/${lang}/common.json`, {
        // Allow the browser to cache these static assets
        cache: "force-cache"
      });
      if (!response.ok) {
        console.warn(`Failed to load translations for ${lang}`);
        return false;
      }
      const data = (await response.json()) as Translations;
      translationsCache[lang] = data;
      setTranslations(prev => ({
        ...prev,
        [lang]: data
      }));
      return true;
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      return false;
    }
  };

  // Load saved locale from localStorage on mount and preload English
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true);

      // Use setTimeout to defer locale detection to avoid hydration mismatch
      setTimeout(() => {
        const savedLocale = localStorage.getItem("exoticfruits-locale") as Locale;
        if (savedLocale && ["en", "fr", "es", "ar", "ru", "pt", "ur"].includes(savedLocale)) {
          setLocale(savedLocale);
        } else {
          // Try to detect browser language
          const browserLang = navigator.language.split("-")[0] as Locale;
          if (["en", "fr", "es", "ar", "ru", "pt", "ur"].includes(browserLang)) {
            setLocale(browserLang);
          }
        }
      }, 0);

      // Preload English translations immediately
      if (!translationsCache.en) {
        loadTranslations("en");
      }
    }
  }, []);

  // Load translations when locale changes (parallelized, cached)
  useEffect(() => {
    let isActive = true;

    const loadForLocale = async () => {
      // Only show loading if we don't have any translations cached
      const hasCurrentLocale = translationsCache[locale];
      const hasEnglish = translationsCache.en;

      if (!hasCurrentLocale && !hasEnglish) {
        setIsLoading(true);
      }

      const langsToLoad: Locale[] = locale === "en" ? ["en"] : ["en", locale];
      await Promise.all(langsToLoad.map(loadTranslations));

      if (isActive) setIsLoading(false);
    };

    loadForLocale();
    return () => {
      isActive = false;
    };
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

  // Update document direction when locale changes (only after hydration)
  useEffect(() => {
    if (typeof window !== "undefined" && isHydrated) {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
    }
  }, [locale, dir, isHydrated]);

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