import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { GiscusComments } from '@/components/giscus-comments';
import { TableOfContents } from '@/components/table-of-contents';
import { AuthorBio } from '@/components/author-bio';
import { PostHeader, PostSidebar, BackButton } from '@/components/post-detail-locale';
import { getAllPosts, getPost, getAllPostsMeta } from '@/lib/posts';
import { generatePostMetadata } from '@/lib/seo';
import { extractHeadings } from '@/lib/toc';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/jsonld';

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

  const headings = extractHeadings(post.content);

  const related = getAllPostsMeta()
    .filter(
      (p) =>
        p.category === post.category &&
        !(p.slug === post.slug && p.year === post.year && p.month === post.month)
    )
    .slice(0, 3);

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema(post);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BackButton>返回首页</BackButton>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-8 lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents headings={headings} />
          </div>
        </aside>

        <article className="min-w-0">
          <div className="mx-auto max-w-[680px]">
            <PostHeader post={post} />
            <MarkdownRenderer content={post.content} />
          </div>
        </article>

        <PostSidebar related={related} />
      </div>

      <div className="mx-auto mt-16 max-w-[680px]">
        <GiscusComments />
      </div>
    </div>
  );
}
