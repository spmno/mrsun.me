'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { siteConfig, siteConfigEn } from '@/lib/site';

export function FooterLocaleWrapper() {
  const { locale } = useLocale();
  const config = locale === 'en' ? siteConfigEn : siteConfig;

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {config.author}. {t(locale, 'allRightsReserved')}.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/rss.xml/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              RSS
            </Link>
            {siteConfig.social.github && (
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Code2 className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
