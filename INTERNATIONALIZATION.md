# Internationalization (i18n) Guide

This project uses a JSON-based internationalization system that supports multiple languages and is easily extensible.

## Current Supported Languages

- 🇺🇸 **English (en)** - Default language
- 🇫🇷 **French (fr)** - Français
- 🇪🇸 **Spanish (es)** - Español  
- 🇸🇦 **Arabic (ar)** - العربية (RTL support)
- 🇷🇺 **Russian (ru)** - Русский

## How to Add a New Language

### 1. Create Translation Files

Create a new JSON file in `public/locales/[language-code]/common.json`

Example for Italian (it):
```bash
mkdir -p public/locales/it
```

Copy the English template and translate:
```bash
cp public/locales/en/common.json public/locales/it/common.json
```

### 2. Update the I18nContext

Add the new language to the `Locale` type in `src/contexts/I18nContext.tsx`:

```typescript
type Locale = "en" | "fr" | "es" | "ar" | "ru" | "it";
```

Add it to the translations state:
```typescript
const [translations, setTranslations] = useState<Record<Locale, Translations>>({
  en: {},
  fr: {},
  es: {},
  ar: {},
  ru: {},
  it: {} // Add new language here
});
```

Add it to the language detection arrays:
```typescript
if (savedLocale && ["en", "fr", "es", "ar", "ru", "it"].includes(savedLocale)) {
  // ...
}

if (["en", "fr", "es", "ar", "ru", "it"].includes(browserLang)) {
  // ...
}
```

### 3. Update the Language Button

Add the new language option in `src/components/ui/LanguageButton.tsx`:

```typescript
const LANGUAGE_OPTIONS: Array<{ code: Locale; name: string; flag: string }> = [
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "ar", name: "العربية", flag: "AR" },
  { code: "ru", name: "Русский", flag: "RU" },
  { code: "it", name: "Italiano", flag: "IT" }, // Add new language here
];
```

## Translation File Structure

The JSON files use nested objects for organization:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "products": "Products"
  },
  "aboutPage": {
    "hero": {
      "title": "About Us",
      "subtitle": "Our story"
    },
    "story": {
      "description1": "First paragraph...",
      "description2": "Second paragraph..."
    }
  }
}
```

## Usage in Components

Use the `useI18n` hook to access translations:

```typescript
import { useI18n } from "@/contexts/I18nContext";

function MyComponent() {
  const { t, locale, setLocale, isLoading } = useI18n();
  
  return (
    <div>
      <h1>{t("aboutPage.hero.title")}</h1>
      <p>{t("aboutPage.story.description1")}</p>
    </div>
  );
}
```

## Features

- **Automatic Fallback**: If a translation is missing in the selected language, it falls back to English
- **Browser Language Detection**: Automatically detects and sets the user's browser language if supported
- **Persistent Selection**: Saves the user's language choice in localStorage
- **Loading State**: Provides loading state while translations are being fetched
- **Nested Object Support**: Supports nested translation keys using dot notation (e.g., "aboutPage.hero.title")
- **Dynamic Loading**: Translations are loaded on-demand from JSON files
- **RTL Support**: Full Right-to-Left text support for Arabic with automatic direction switching
- **Font Optimization**: Optimized fonts for different language scripts

## File Locations

- **Translation Files**: `public/locales/[lang]/common.json`
- **I18n Context**: `src/contexts/I18nContext.tsx`
- **Language Button**: `src/components/ui/LanguageButton.tsx`
- **Pages Using Translations**: 
  - `src/app/apropre/page.tsx`
  - `src/app/products/page.tsx`
  - `src/app/blog/page.tsx`

## Best Practices

1. **Consistent Naming**: Use descriptive, hierarchical key names
2. **Complete Translations**: Ensure all languages have all keys (use English as fallback)
3. **Context-Aware**: Group related translations under logical parent keys
4. **Professional Translation**: Use professional translation services for production
5. **Testing**: Test all languages to ensure proper display and functionality

## Adding More Translation Files

You can extend the system by adding more translation files (e.g., `errors.json`, `forms.json`) and updating the loading logic in the I18nContext to support multiple namespaces.
