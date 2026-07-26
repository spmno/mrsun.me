'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PostList } from '@/components/post-list';
import { useLocale } from '@/components/locale-provider';
import { t, tFn } from '@/lib/i18n';
import type { PostMeta } from '@/lib/posts';

export function SearchBox({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const { locale } = useLocale();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, posts]);

  const foundFn = tFn(locale, 'foundPosts');
  const totalFn = tFn(locale, 'totalPosts');

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t(locale, 'searchPlaceholderFull')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length > 0
            ? foundFn(filtered.length)
            : query
              ? t(locale, 'noResults')
              : totalFn(posts.length)}
        </p>
        <PostList posts={filtered} />
      </div>
    </div>
  );
}
