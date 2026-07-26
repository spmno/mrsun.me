'use client';

import { PostCard } from '@/components/post-card';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import type { PostMeta } from '@/lib/posts';

export function PostList({ posts }: { posts: PostMeta[] }) {
  const { locale } = useLocale();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground text-lg">{t(locale, 'noPosts')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={`${post.year}/${post.month}/${post.slug}`} post={post} />
      ))}
    </div>
  );
}
