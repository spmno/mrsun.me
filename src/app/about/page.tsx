import type { Metadata } from 'next';
import { Code2 } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = genMeta({
  title: '关于',
  description: '关于本站和作者',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">关于</h1>

      <div className="prose_custom space-y-6">
        <p>
          你好，我是 <strong>{siteConfig.author}</strong>。
          欢迎来到我的个人博客 {siteConfig.title}。
        </p>
        <p>
          这里是我记录技术探索、编程心得和思考的地方。
          我热衷于探索新技术，分享知识，并通过写作来整理自己的理解。
        </p>

        <h2 className="text-xl font-semibold">技术栈</h2>
        <ul>
          <li>前端：Next.js 16、React 19、TypeScript、Tailwind CSS 4、shadcn/ui</li>
          <li>部署：EdgeOne Pages 静态托管</li>
          <li>内容：Markdown + gray-matter + react-markdown</li>
          <li>评论：Giscus (GitHub Discussions)</li>
        </ul>

        <h2 className="text-xl font-semibold">联系方式</h2>
        <div className="flex gap-4">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Code2 className="h-5 w-5" />
              GitHub
            </a>
          )}
        </div>

        <h2 className="text-xl font-semibold">关于本站</h2>
        <p>
          本博客基于 Next.js 16 静态导出构建，部署在 EdgeOne Pages 上。
          所有页面在构建时预渲染为静态 HTML，无需服务器端运行。
          如果你有任何问题或建议，欢迎通过评论区留言。
        </p>
      </div>
    </div>
  );
}
