import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { PostList } from '@/components/post-list';
import { generateMetadata as genMeta } from '@/lib/seo';

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return genMeta({
    title: `标签: ${decoded}`,
    description: `标签「${decoded}」下的所有文章`,
    path: `/tags/${tag}/`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">
        标签: <span className="gradient-text">{decoded}</span>
      </h1>
      <p className="text-muted-foreground mb-8">{posts.length} 篇文章</p>
      <PostList posts={posts} />
    </div>
  );
}
