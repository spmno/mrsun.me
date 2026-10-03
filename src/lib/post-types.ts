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
  Frontend: 'from-blue-500/30 to-cyan-500/30',
  Design: 'from-pink-500/30 to-rose-600/30',
  Tech: 'from-indigo-500/30 to-blue-600/30',
  Blogging: 'from-teal-500/30 to-cyan-600/30',
  Tutorials: 'from-amber-500/30 to-orange-600/30',
  Tools: 'from-sky-500/30 to-blue-600/30',
  WebRTC: 'from-cyan-500/30 to-teal-600/30',
};

const DEFAULT_GRADIENT = 'from-slate-500/30 to-gray-600/30';

export function getCategoryGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] || DEFAULT_GRADIENT;
}
