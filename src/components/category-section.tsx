import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HomeSectionCard } from '@/components/home-section-card';
import type { PostMeta } from '@/lib/posts';

interface CategorySectionProps {
  category: string;
  posts: PostMeta[];
  maxItems?: number;
}

export function CategorySection({ category, posts, maxItems = 4 }: CategorySectionProps) {
  const displayPosts = posts.slice(0, maxItems);
  const categoryHref = `/categories/${encodeURIComponent(category)}/`;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <Link href={categoryHref} className="group flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-primary/60" />
          <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
            {category}
          </h2>
          <span className="text-xs font-normal text-muted-foreground">
            ({posts.length} 篇)
          </span>
        </Link>
        <Link
          href={categoryHref}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          查看全部
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {displayPosts.map((post) => (
          <HomeSectionCard
            key={`${post.year}/${post.month}/${post.slug}`}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}
