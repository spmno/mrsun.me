import { getAllPostsMeta } from '@/lib/posts';
import { siteConfig } from '@/lib/site';
import { PaginatedPostList } from '@/components/paginated-post-list';

export default function HomePage() {
  const allPosts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-0.5 h-5 rounded-full bg-primary/60" />
          <h1 className="text-3xl font-bold gradient-text">
            {siteConfig.title}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground/70">{siteConfig.description}</p>
      </div>
      <PaginatedPostList posts={allPosts} />
    </div>
  );
}
