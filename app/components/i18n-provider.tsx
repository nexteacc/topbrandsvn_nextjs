'use client';

import { I18nextProvider } from 'react-i18next';
import i18nInstance from '@/lib/i18n'; 
import { ReactNode, useEffect } from 'react';

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export default function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  useEffect(() => {
    
    const langToSet = initialLocale || localStorage.getItem('i18nextLng') || 'en';
    if (i18nInstance.language !== langToSet) {
      i18nInstance.changeLanguage(langToSet);
    }
   
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem('i18nextLng', lng);
    };
    i18nInstance.on('languageChanged', handleLanguageChanged);

    
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChanged);
    };
  }, [initialLocale]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}