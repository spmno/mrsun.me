import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { AboutLocaleWrapper } from '@/components/about-locale-wrapper';

export const metadata: Metadata = genMeta({
  title: 'About — The Developer Behind the Blog',
  description:
    'Who writes MrSun? A developer sharing hands-on experience with Rust, AI, local LLM deployment, Linux, and frontend — plus how this blog is built.',
  path: '/about/',
});

export default function AboutPage() {
  return <AboutLocaleWrapper />;
}
