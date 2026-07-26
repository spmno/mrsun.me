'use client';

import Link from 'next/link';
import { useLocale } from '@/components/locale-provider';
import { t, tFn, getMonthNames } from '@/lib/i18n';
import type { ArchiveGroup } from '@/lib/post-types';

interface ArchiveLocaleWrapperProps {
  groups: ArchiveGroup[];
}

export function ArchiveLocaleWrapper({ groups }: ArchiveLocaleWrapperProps) {
  const { locale } = useLocale();
  const postsCountFn = tFn(locale, 'postsCount');
  const monthNames = getMonthNames(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">{t(locale, 'archiveTitle')}</h1>

      {groups.length === 0 ? (
        <p className="text-muted-foreground">{t(locale, 'noPosts')}</p>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.year}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="gradient-text">{group.year}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  ({postsCountFn(group.months.reduce((acc, m) => acc + m.posts.length, 0))})
                </span>
              </h2>
              <div className="space-y-6 border-l-2 border-border/50 pl-6">
                {group.months.map(({ month, posts }) => (
                  <div key={month}>
                    <h3 className="text-lg font-medium mb-3 text-primary">
                      {monthNames[Number(month) - 1] || month}
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
