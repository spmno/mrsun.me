import Link from 'next/link';
import { Search } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { getFeaturedPosts, getPostsByCategoryGrouped } from '@/lib/posts';
import { HomeFeaturedCard } from '@/components/home-featured-card';
import { CategorySection } from '@/components/category-section';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(5);
  const categoryGroups = getPostsByCategoryGrouped();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-16 text-center sm:py-20">
        <h1 className="mb-4 text-4xl font-bold gradient-text sm:text-5xl">
          {siteConfig.title}
        </h1>
        <p className="mb-8 text-base text-muted-foreground sm:text-lg">
          {siteConfig.description}
        </p>
        <Link
          href="/search/"
          className="mx-auto flex max-w-md items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
        >
          <Search className="h-4 w-4 shrink-0" />
          搜索文章...
        </Link>
      </section>

      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-primary/60" />
            <h2 className="text-xl font-bold">最新文章</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(0, 3).map((post) => (
              <HomeFeaturedCard
                key={`${post.year}/${post.month}/${post.slug}`}
                post={post}
              />
            ))}
          </div>
          {featuredPosts.length > 3 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {featuredPosts.slice(3, 5).map((post) => (
                <HomeFeaturedCard
                  key={`${post.year}/${post.month}/${post.slug}`}
                  post={post}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="mb-12 space-y-10">
        {categoryGroups
          .filter((group) => group.posts.length >= 2)
          .map((group) => (
            <CategorySection
              key={group.category}
              category={group.category}
              posts={group.posts}
            />
          ))}
      </div>
    </div>
  );
}
