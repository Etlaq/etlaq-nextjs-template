'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { translations, type Language, type TranslationKeys } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
  isArabic: boolean;
  translations: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  // Memoize translations to avoid recalculating on every render
  const currentTranslations = useMemo(() => translations[language], [language]);

  const updateDocumentDirection = (lang: Language) => {
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar-SA');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLanguageState(savedLang);
      updateDocumentDirection(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    updateDocumentDirection(lang);
  };

  // Legacy translation helper - returns Arabic or English based on current language
  // For backward compatibility; prefer using translations object directly
  const t = (ar: string, en: string) => {
    return language === 'ar' ? ar : en;
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isArabic: language === 'ar', translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
