import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { CategoryTagPage } from '@/components/category-tag-page-locale';
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
    <CategoryTagPage
      title={decoded}
      titlePrefix="tagPrefix"
      count={posts.length}
      posts={posts}
    />
  );
}
