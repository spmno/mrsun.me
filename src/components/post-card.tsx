import Link from 'next/link';
import { Calendar, FolderOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PostMeta } from '@/lib/posts';

export function PostCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.year}/${post.month}/${post.slug}/`;

  return (
    <Link href={href} className="block group">
      <Card className="glass-card bg-gradient-to-b from-card to-card/85 overflow-hidden transition-all duration-300 hover:glow-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_30px_-8px_var(--ring)]">
        <CardHeader>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 mb-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <FolderOpen className="h-3 w-3 shrink-0" />
              {post.category}
            </span>
          </div>
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
