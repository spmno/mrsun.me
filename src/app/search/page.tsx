import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/posts';
import { generateMetadata as genMeta } from '@/lib/seo';
import { SearchLocaleWrapper } from '@/components/search-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: 'Search — Find Articles by Keyword',
  description:
    'Search every article on MrSun by keyword — find posts on Rust, AI, local LLM deployment, Linux, frontend, and more.',
  path: '/search/',
});

export default function SearchPage() {
  const posts = getAllPostsMeta();
  return <SearchLocaleWrapper posts={posts} />;
}
