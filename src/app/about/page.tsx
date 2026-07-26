import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { AboutLocaleWrapper } from '@/components/about-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: '关于',
  description: '关于本站和作者',
  path: '/about/',
});

export default function AboutPage() {
  return <AboutLocaleWrapper />;
}
