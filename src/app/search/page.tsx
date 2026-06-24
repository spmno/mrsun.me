import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/posts';
import { SearchBox } from '@/components/search-box';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: '搜索',
  description: '搜索文章',
  path: '/search/',
});

export default function SearchPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">搜索文章</h1>
      <SearchBox posts={posts} />
    </div>
  );
}
