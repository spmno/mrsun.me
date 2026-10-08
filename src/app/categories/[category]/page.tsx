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
  const count = getPostsByCategory(category).length;
  return genMeta({
    title: `All ${count} ${decoded} Article${count === 1 ? '' : 's'} and Tutorials`,
    description: `Browse all ${count} ${decoded} articles on MrSun — tutorials, solutions, and hands-on engineering notes, sorted newest first.`,
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
