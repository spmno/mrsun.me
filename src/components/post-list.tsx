import { PostCard } from '@/components/post-card';
import type { PostMeta } from '@/lib/posts';

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground text-lg">暂时没有文章</p>
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
