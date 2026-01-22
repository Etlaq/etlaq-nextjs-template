// Type-safe translation accessor
import { ar, type TranslationKeys } from './ar';
import { en } from './en';

export type Language = 'ar' | 'en';

export const translations: Record<Language, TranslationKeys> = {
  ar,
  en,
};

export function getTranslations(language: Language): TranslationKeys {
  return translations[language];
}

// Re-export types
export type { TranslationKeys };
export { ar, en };
