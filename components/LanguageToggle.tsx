'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@heroui/react';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onPress={toggleLanguage}
      className="rounded-full w-10 h-10 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <span className="text-xs font-semibold">
        {language === 'ar' ? 'EN' : 'ع'}
      </span>
    </Button>
  );
}
