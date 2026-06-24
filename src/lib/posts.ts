import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  cover?: string;
  year: string;
  month: string;
}

export interface Post extends PostMeta {
  content: string;
}

interface RawPostFile {
  filePath: string;
  year: string;
  month: string;
  slug: string;
}

/**
 * Recursively walk the posts directory to find all .md files.
 * Expected structure: posts/YYYY/MM/slug.md
 */
function discoverPostFiles(dir: string, base: string = ''): RawPostFile[] {
  const results: RawPostFile[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      results.push(...discoverPostFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // relativePath looks like "2026/06/hello-world.md"
      const parts = relativePath.split(path.sep);
      if (parts.length >= 3) {
        const year = parts[parts.length - 3];
        const month = parts[parts.length - 2];
        const slug = entry.name.replace(/\.md$/, '');
        results.push({ filePath: fullPath, year, month, slug });
      }
    }
  }

  return results;
}

function parsePostFile(file: RawPostFile): Post | null {
  try {
    const raw = fs.readFileSync(file.filePath, 'utf-8');
    const { data, content } = matter(raw);

    if (!data.title || !data.date) return null;

    return {
      slug: file.slug,
      title: data.title,
      date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
      description: data.description || '',
      category: data.category || '未分类',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover,
      year: file.year,
      month: file.month,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const files = discoverPostFiles(postsDirectory);
  const posts = files
    .map(parsePostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getPost(year: string, month: string, slug: string): Post | null {
  const files = discoverPostFiles(postsDirectory);
  const file = files.find(
    (f) => f.year === year && f.month === month && f.slug === slug
  );
  if (!file) return null;
  return parsePostFile(file);
}

export function getPostsByCategory(category: string): PostMeta[] {
  const decoded = decodeURIComponent(category);
  return getAllPostsMeta().filter(
    (p) => p.category.toLowerCase() === decoded.toLowerCase()
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  const decoded = decodeURIComponent(tag);
  return getAllPostsMeta().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === decoded.toLowerCase())
  );
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getArchiveGroups(): {
  year: string;
  months: { month: string; posts: PostMeta[] }[];
}[] {
  const posts = getAllPostsMeta();
  const yearMap = new Map<string, Map<string, PostMeta[]>>();

  for (const post of posts) {
    if (!yearMap.has(post.year)) yearMap.set(post.year, new Map());
    const monthMap = yearMap.get(post.year)!;
    if (!monthMap.has(post.month)) monthMap.set(post.month, []);
    monthMap.get(post.month)!.push(post);
  }

  return Array.from(yearMap.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries())
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([month, posts]) => ({ month, posts })),
    }));
}

export function paginate<T>(items: T[], page: number, perPage: number = 10) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    total,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
