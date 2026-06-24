import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FolderOpen, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { GiscusComments } from '@/components/giscus-comments';
import { getAllPosts, getPost, getAllPostsMeta } from '@/lib/posts';
import { generatePostMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>;
}): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = getPost(year, month, slug);
  if (!post) return {};
  return generatePostMetadata(post);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>;
}) {
  const { year, month, slug } = await params;
  const post = getPost(year, month, slug);
  if (!post) notFound();

  const related = getAllPostsMeta()
    .filter(
      (p) =>
        p.category === post.category &&
        !(p.slug === post.slug && p.year === post.year && p.month === post.month)
    )
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6 gap-1.5 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Button>
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {post.date}
          </span>
          <Link href={`/categories/${encodeURIComponent(post.category)}/`}>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <FolderOpen className="h-4 w-4" />
              {post.category}
            </span>
          </Link>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
                <Badge variant="secondary" className="hover:bg-accent transition-colors">
                  <Tag className="h-2.5 w-2.5 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </header>

      <MarkdownRenderer content={post.content} />

      {related.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border/50">
          <h2 className="text-xl font-semibold mb-4">相关文章</h2>
          <div className="grid gap-3">
            {related.map((p) => (
              <Link
                key={`${p.year}/${p.month}/${p.slug}`}
                href={`/posts/${p.year}/${p.month}/${p.slug}/`}
                className="block p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-all"
              >
                <h3 className="font-medium group-hover:text-primary">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {p.date} · {p.category}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <GiscusComments />
    </article>
  );
}
