'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/lib/site';

export function GiscusComments() {
  const { resolvedTheme } = useTheme();

  if (!siteConfig.giscus.repoId || !siteConfig.giscus.categoryId) {
    return (
      <div className="mt-12 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground text-center">
          评论系统配置中。请在{' '}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            giscus.app
          </a>{' '}
          获取配置并填写 <code className="text-xs">src/lib/site.ts</code> 中的 giscus 配置。
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
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
