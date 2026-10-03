import type { Metadata } from 'next';
import { getArchiveGroups } from '@/lib/posts';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ArchiveLocaleWrapper } from '@/components/archive-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: 'Archive',
  description: 'All articles by date',
  path: '/archive/',
});

export default function ArchivePage() {
  const groups = getArchiveGroups();
  return <ArchiveLocaleWrapper groups={groups} />;
}
