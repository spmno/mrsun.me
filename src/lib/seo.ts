import type { Metadata } from 'next';
import { siteConfig } from './site';
import type { PostMeta } from './posts';

interface PostSEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: PostSEOProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-default.png`;

  return {
    title,
    description,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description,
      url,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(type === 'article' && {
        authors: [siteConfig.author],
        tags,
      }),
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generatePostMetadata(post: PostMeta): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.description,
    path: `/posts/${post.year}/${post.month}/${post.slug}/`,
    image: post.cover,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    tags: post.tags,
  });
}
