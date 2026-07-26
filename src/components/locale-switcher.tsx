'use client';

import { Languages } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
      className="inline-flex items-center justify-center size-8 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground/60 hover:text-foreground transition-colors"
      title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">{locale === 'zh' ? 'Switch to English' : '切换到中文'}</span>
    </button>
  );
}
