"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [initialized, setInitialized] = useState(false);

  // Load initial language and translations
  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('portfolio-language') as Language;
    const initialLang = (savedLang === 'en' || savedLang === 'hi') ? savedLang : 'en';
    setLanguageState(initialLang);

    // Load translations for initial language
    import(`../translations/${initialLang === 'hi' ? 'hi' : 'en'}.ts`)
      .then((module) => {
        setTranslations(module.default);
        setInitialized(true);
      })
      .catch((err) => {
        console.error('Failed to load translations:', err);
        // Fallback to English
        import('../translations/en.ts').then((module) => {
          setTranslations(module.default);
          setInitialized(true);
        });
      });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
    // Reload translations
    import(`../translations/${lang === 'hi' ? 'hi' : 'en'}.ts`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((err) => {
        console.error('Failed to load translations:', err);
        // Fallback to English
        import('../translations/en.ts').then((module) => {
          setTranslations(module.default);
        });
      });
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

