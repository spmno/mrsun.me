import type { MetadataRoute } from 'next';
import {
  getAllPostsMeta,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
} from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const tags = getAllTags();

  const latestDate = posts.length > 0 ? new Date(posts[0].date) : undefined;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      ...(latestDate && { lastModified: latestDate }),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/archive/`,
      ...(latestDate && { lastModified: latestDate }),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    { url: `${siteConfig.url}/search/`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteConfig.url}/about/`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.year}/${post.month}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => {
    const newest = getPostsByCategory(cat.name)[0];
    return {
      url: `${siteConfig.url}/categories/${encodeURIComponent(cat.name)}/`,
      lastModified: new Date(newest.date),
      changeFrequency: 'weekly',
      priority: 0.5,
    };
  });

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => {
    const newest = getPostsByTag(tag.name)[0];
    return {
      url: `${siteConfig.url}/tags/${encodeURIComponent(tag.name)}/`,
      lastModified: new Date(newest.date),
      changeFrequency: 'weekly',
      priority: 0.4,
    };
  });

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
}
