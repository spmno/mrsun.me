import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { getCategoryGradient } from '@/lib/posts';

export function HomeSectionCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.year}/${post.month}/${post.slug}/`;
  const gradient = getCategoryGradient(post.category);

  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-lg border border-border/40 bg-card/30 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5">
        <div className="aspect-[16/9] overflow-hidden">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-xl font-bold text-foreground/15">{post.category}</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground/60">{post.date}</p>
        </div>
      </div>
    </Link>
  );
}
