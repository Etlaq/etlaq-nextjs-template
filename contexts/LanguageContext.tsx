'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  isArabic: boolean;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ar' ? 'ar-SA' : 'en';
    document.documentElement.dir = dir;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const t = useCallback((ar: string, en: string) => {
    return lang === 'ar' ? ar : en;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        isArabic: lang === 'ar',
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
