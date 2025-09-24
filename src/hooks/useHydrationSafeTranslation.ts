"use client";

import { useEffect, useState } from "react";
import { useI18n, type TranslationKey } from "@/contexts/I18nContext";

export function useHydrationSafeTranslation() {
  const { t, locale } = useI18n();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const ht = (key: TranslationKey, fallback?: string): string => {
    if (!isHydrated) {
      return fallback || key;
    }
    return t(key);
  };

  return { ht, isHydrated, locale };
}