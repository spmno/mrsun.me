'use client';

import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';

export function NotFoundLocaleWrapper() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-foreground/80 mb-2">{t(locale, 'notFoundTitle')}</p>
        <p className="text-muted-foreground mb-8">
          {t(locale, 'notFoundDesc')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="default" className="gap-2">
              <Home className="h-4 w-4" />
              {t(locale, 'backToHome')}
            </Button>
          </Link>
          <Link href="/search/">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              {t(locale, 'searchArticles')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
