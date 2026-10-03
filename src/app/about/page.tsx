import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { AboutLocaleWrapper } from '@/components/about-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: 'About',
  description: 'About this site and the author',
  path: '/about/',
});

export default function AboutPage() {
  return <AboutLocaleWrapper />;
}
