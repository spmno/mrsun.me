'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { siteConfig, siteConfigEn } from '@/lib/site';

export function AuthorBio() {
  const { locale } = useLocale();
  const config = locale === 'en' ? siteConfigEn : siteConfig;

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {config.author.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{config.author}</h3>
          <p className="text-xs text-muted-foreground">{t(locale, 'authorBio')}</p>
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        {config.description}
      </p>
      {siteConfig.social.github && (
        <Link
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <Code2 className="h-3.5 w-3.5" />
          GitHub
        </Link>
      )}
    </div>
  );
}
