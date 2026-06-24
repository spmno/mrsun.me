import type { MetadataRoute } from 'next';
import { getAllPostsMeta, getAllCategories, getAllTags } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteConfig.url}/archive/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteConfig.url}/search/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteConfig.url}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.year}/${post.month}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteConfig.url}/categories/${encodeURIComponent(cat.name)}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag.name)}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
}
