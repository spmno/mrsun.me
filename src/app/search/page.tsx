import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/posts';
import { generateMetadata as genMeta } from '@/lib/seo';
import { SearchLocaleWrapper } from '@/components/search-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: '搜索',
  description: '搜索文章',
  path: '/search/',
});

export default function SearchPage() {
  const posts = getAllPostsMeta();
  return <SearchLocaleWrapper posts={posts} />;
}
