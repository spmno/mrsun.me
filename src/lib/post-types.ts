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

export interface ArchiveGroup {
  year: string;
  months: { month: string; posts: PostMeta[] }[];
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Rust: 'from-orange-500/30 to-red-600/30',
  AI: 'from-purple-500/30 to-violet-600/30',
  Linux: 'from-emerald-500/30 to-green-600/30',
  前端: 'from-blue-500/30 to-cyan-500/30',
  设计: 'from-pink-500/30 to-rose-600/30',
  技术: 'from-indigo-500/30 to-blue-600/30',
  博客: 'from-teal-500/30 to-cyan-600/30',
};

const DEFAULT_GRADIENT = 'from-slate-500/30 to-gray-600/30';

export function getCategoryGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] || DEFAULT_GRADIENT;
}
