'use client';

import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { SearchBox } from '@/components/search-box';
import type { PostMeta } from '@/lib/posts';

interface SearchLocaleWrapperProps {
  posts: PostMeta[];
}

export function SearchLocaleWrapper({ posts }: SearchLocaleWrapperProps) {
  const { locale } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">{t(locale, 'searchTitle')}</h1>
      <SearchBox posts={posts} />
    </div>
  );
}
