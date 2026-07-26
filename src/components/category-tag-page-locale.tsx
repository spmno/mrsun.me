'use client';

import { useLocale } from '@/components/locale-provider';
import { t, tFn } from '@/lib/i18n';
import { PostList } from '@/components/post-list';
import type { PostMeta } from '@/lib/posts';

interface CategoryTagPageProps {
  title: string;
  titlePrefix: 'categoryPrefix' | 'tagPrefix';
  count: number;
  posts: PostMeta[];
}

export function CategoryTagPage({ title, titlePrefix, count, posts }: CategoryTagPageProps) {
  const { locale } = useLocale();
  const articlesCountFn = tFn(locale, 'articlesCount');

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {t(locale, titlePrefix)} <span className="gradient-text">{title}</span>
      </h1>
      <p className="text-muted-foreground mb-8">{articlesCountFn(count)}</p>
      <PostList posts={posts} />
    </div>
  );
}
