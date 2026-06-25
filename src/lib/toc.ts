import GithubSlugger from 'github-slugger';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Strip inline markdown formatting from heading text to get plain text.
 * Handles: images, links, bold, italic, strikethrough, inline code.
 */
function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/__([^_]*)__/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/_([^_]*)_/g, '$1')
    .replace(/~~([^~]*)~~/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\s+#+\s*$/, '')
    .trim();
}

/**
 * Extract h2 and h3 headings from markdown content.
 * Generates slug IDs matching rehype-slug's output (uses the same github-slugger).
 * Skips headings inside code blocks.
 */
export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = stripMarkdownFormatting(match[2]);
      headings.push({
        id: slugger.slug(text),
        text,
        level,
      });
    }
  }

  return headings;
}
