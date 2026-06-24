import type { Metadata } from 'next';
import Link from 'next/link';
import { getArchiveGroups } from '@/lib/posts';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: '归档',
  description: '所有文章按时间归档',
  path: '/archive/',
});

const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];

export default function ArchivePage() {
  const groups = getArchiveGroups();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">归档</h1>

      {groups.length === 0 ? (
        <p className="text-muted-foreground">暂时没有文章</p>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.year}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="gradient-text">{group.year}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  ({group.months.reduce((acc, m) => acc + m.posts.length, 0)} 篇)
                </span>
              </h2>
              <div className="space-y-6 border-l-2 border-border/50 pl-6">
                {group.months.map(({ month, posts }) => (
                  <div key={month}>
                    <h3 className="text-lg font-medium mb-3 text-primary">
                      {MONTH_NAMES[Number(month) - 1] || month}
                    </h3>
                    <ul className="space-y-2">
                      {posts.map((post) => (
                        <li key={`${post.year}/${post.month}/${post.slug}`}>
                          <Link
                            href={`/posts/${post.year}/${post.month}/${post.slug}/`}
                            className="group flex items-baseline gap-3"
                          >
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {post.date}
                            </span>
                            <span className="text-foreground/90 group-hover:text-primary transition-colors">
                              {post.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
