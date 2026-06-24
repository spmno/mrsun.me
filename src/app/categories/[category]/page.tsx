import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { PostList } from '@/components/post-list';
import { generateMetadata as genMeta } from '@/lib/seo';

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: encodeURIComponent(cat.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return genMeta({
    title: `分类: ${decoded}`,
    description: `${decoded} 分类下的所有文章`,
    path: `/categories/${category}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(category);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">
        分类: <span className="gradient-text">{decoded}</span>
      </h1>
      <p className="text-muted-foreground mb-8">{posts.length} 篇文章</p>
      <PostList posts={posts} />
    </div>
  );
}
