import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';
import { getCategoryGradient } from '@/lib/posts';

export function HomeFeaturedCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.year}/${post.month}/${post.slug}/`;
  const gradient = getCategoryGradient(post.category);

  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-xl border border-border/50 bg-card/40 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_30px_-8px_var(--ring)]">
        <div className="aspect-[16/9] overflow-hidden">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-3xl font-bold text-foreground/15">{post.category}</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-[11px] text-muted-foreground/70">
            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium text-primary">
              {post.category}
            </span>
            <time dateTime={post.date} className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" />
              {post.date}
            </time>
          </div>
          <h3 className="mb-2 text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
