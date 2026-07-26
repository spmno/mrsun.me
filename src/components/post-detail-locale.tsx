'use client';

import Link from 'next/link';
import { Calendar, FolderOpen, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import type { PostMeta } from '@/lib/posts';

interface PostHeaderProps {
  post: PostMeta;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { locale } = useLocale();

  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <time dateTime={post.date} className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {post.date}
        </time>
        <Link href={`/categories/${encodeURIComponent(post.category)}/`}>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <FolderOpen className="h-4 w-4" />
            {post.category}
          </span>
        </Link>
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
              <Badge variant="secondary" className="hover:bg-accent transition-colors">
                <Tag className="h-2.5 w-2.5 mr-1" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

interface PostSidebarProps {
  related: PostMeta[];
}

export function PostSidebar({ related }: PostSidebarProps) {
  const { locale } = useLocale();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-6">
        {related.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-foreground mb-3">
              {t(locale, 'relatedPosts')}
            </h2>
            <div className="space-y-3">
              {related.map((p) => (
                <Link
                  key={`${p.year}/${p.month}/${p.slug}`}
                  href={`/posts/${p.year}/${p.month}/${p.slug}/`}
                  className="block group"
                >
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.date} · {p.category}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}

interface BackButtonProps {
  children: React.ReactNode;
}

export function BackButton({ children }: BackButtonProps) {
  return (
    <Link href="/">
      <Button variant="ghost" size="sm" className="mb-6 gap-1.5 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" />
        {children}
      </Button>
    </Link>
  );
}
