'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: 'zh',
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale === 'zh' ? 'zh-CN' : 'en';
  }, []);

  // Prevent flash by rendering children only after mounting
  if (!mounted) {
    return <LocaleContext.Provider value={{ locale: 'zh', setLocale }}>{children}</LocaleContext.Provider>;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
