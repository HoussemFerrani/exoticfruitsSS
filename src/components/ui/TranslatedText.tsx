"use client";

import { useI18n, type TranslationKey } from "@/contexts/I18nContext";
import ClientOnly from "./ClientOnly";

interface TranslatedTextProps {
  translationKey: TranslationKey;
  fallback?: string;
}

export default function TranslatedText({
  translationKey,
  fallback
}: TranslatedTextProps) {
  const { t } = useI18n();

  // Use the English translation as fallback to ensure server/client consistency
  const englishFallback = fallback || (translationKey === "common.exploreButton" ? "Explore Our Fruits" : translationKey);

  return (
    <ClientOnly fallback={englishFallback}>
      {t(translationKey)}
    </ClientOnly>
  );
}