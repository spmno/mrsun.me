import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { CategoryTagPage } from '@/components/category-tag-page-locale';
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
    <CategoryTagPage
      title={decoded}
      titlePrefix="categoryPrefix"
      count={posts.length}
      posts={posts}
    />
  );
}
