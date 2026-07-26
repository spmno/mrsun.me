'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { siteConfig, siteConfigEn } from '@/lib/site';

export function AboutLocaleWrapper() {
  const { locale } = useLocale();
  const config = locale === 'en' ? siteConfigEn : siteConfig;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">{t(locale, 'aboutTitle')}</h1>

      <div className="prose_custom space-y-6">
        <p>
          {t(locale, 'aboutIntro')}{' '}
          <strong>{config.author}</strong>。
          {t(locale, 'aboutWelcome')} {config.title}。
        </p>
        <p>
          {t(locale, 'aboutContent')}
        </p>

        <h2 className="text-xl font-semibold">{t(locale, 'techStack')}</h2>
        <ul>
          <li>前端：Next.js 16、React 19、TypeScript、Tailwind CSS 4、shadcn/ui</li>
          <li>部署：EdgeOne Pages 静态托管</li>
          <li>内容：Markdown + gray-matter + react-markdown</li>
          <li>评论：Giscus (GitHub Discussions)</li>
        </ul>

        <h2 className="text-xl font-semibold">{t(locale, 'contactInfo')}</h2>
        <ul className="list-none space-y-2">
          <li>📞 {t(locale, 'phone')}：<a href="tel:+8618640244301" className="text-primary hover:underline">+86 18640244301</a></li>
          <li>💬 {t(locale, 'wechat')}：zhongyichengxuyuan</li>
          <li>✉️ {t(locale, 'email')}：<a href="mailto:sunqingpeng@hotmail.com" className="text-primary hover:underline">sunqingpeng@hotmail.com</a></li>
          <li className="pt-2">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline w-fit"
            >
              <Code2 className="h-5 w-5" />
              GitHub
            </a>
          </li>
        </ul>

        <h2 className="text-xl font-semibold">{t(locale, 'aboutSite')}</h2>
        <p>
          {t(locale, 'aboutSiteDesc')}
        </p>
      </div>
    </div>
  );
}
