import { siteConfig } from './site';
import type { PostMeta } from './posts';

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: `${siteConfig.url}/about/`,
    ...(siteConfig.social.github && {
      sameAs: [siteConfig.social.github],
    }),
  };
}

export function generateArticleSchema(post: PostMeta) {
  const url = `${siteConfig.url}/posts/${post.year}/${post.month}/${post.slug}/`;
  const coverUrl = post.cover
    ? post.cover.startsWith('http')
      ? post.cover
      : `${siteConfig.url}${post.cover}`
    : `${siteConfig.url}/og-default.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: coverUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: `${siteConfig.url}/about/`,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
      url: `${siteConfig.url}/about/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: siteConfig.locale,
    url,
  };
}

export function generateBreadcrumbSchema(post: PostMeta) {
  const postUrl = `${siteConfig.url}/posts/${post.year}/${post.month}/${post.slug}/`;
  const categoryUrl = `${siteConfig.url}/categories/${encodeURIComponent(post.category)}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: `${siteConfig.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
}
