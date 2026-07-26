'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const { locale } = useLocale();

  if (!siteConfig.giscus.repoId || !siteConfig.giscus.categoryId) {
    return (
      <div className="mt-12 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground text-center">
          {t(locale, 'giscusConfig')}{' '}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            giscus.app
          </a>{' '}
          {t(locale, 'giscusGetConfig')} <code className="text-xs">src/lib/site.ts</code> {t(locale, 'giscusFillConfig')}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-border pt-8">
      <Giscus
        repo={siteConfig.giscus.repo}
        repoId={siteConfig.giscus.repoId}
        category={siteConfig.giscus.category}
        categoryId={siteConfig.giscus.categoryId}
        mapping={siteConfig.giscus.mapping}
        reactionsEnabled={siteConfig.giscus.reactionsEnabled}
        emitMetadata={siteConfig.giscus.emitMetadata}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang={locale === 'zh' ? 'zh-CN' : 'en'}
        loading="lazy"
      />
    </div>
  );
}
