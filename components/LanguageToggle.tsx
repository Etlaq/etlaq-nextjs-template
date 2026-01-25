'use client';

import { Button } from '@heroui/react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, setLanguage } = useLanguage();

  return (
    <Button
      size="sm"
      variant="ghost"
      onPress={() => setLanguage(lang === 'ar' ? 'en' : 'ar')}
      className="min-w-[44px] font-medium"
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </Button>
  );
}
