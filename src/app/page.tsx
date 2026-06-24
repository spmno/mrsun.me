import { getAllPostsMeta } from '@/lib/posts';
import { siteConfig } from '@/lib/site';
import { PaginatedPostList } from '@/components/paginated-post-list';

export default function HomePage() {
  const allPosts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          {siteConfig.title}
        </h1>
        <p className="text-muted-foreground">{siteConfig.description}</p>
      </div>
      <PaginatedPostList posts={allPosts} />
    </div>
  );
}
