import type { Metadata } from 'next';
import { getArchiveGroups, getAllPostsMeta } from '@/lib/posts';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ArchiveLocaleWrapper } from '@/components/archive-locale-wrapper';

const totalPosts = getAllPostsMeta().length;

export const metadata: Metadata = genMeta({
  title: 'Article Archive — All Posts by Date',
  description: `Browse all ${totalPosts} articles on MrSun by date — posts on Rust, AI, local LLM deployment, Linux, and frontend development, newest first.`,
  path: '/archive/',
});

export default function ArchivePage() {
  const groups = getArchiveGroups();
  return <ArchiveLocaleWrapper groups={groups} />;
}
