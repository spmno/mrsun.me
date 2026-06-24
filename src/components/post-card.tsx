import Link from 'next/link';
import { Calendar, FolderOpen, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PostMeta } from '@/lib/posts';

export function PostCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.year}/${post.month}/${post.slug}/`;

  return (
    <Link href={href} className="block group">
      <Card className="glass-card overflow-hidden transition-all duration-300 hover:glow-border hover:border-primary/30 hover:-translate-y-0.5">
        <CardHeader>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FolderOpen className="h-3 w-3" />
              {post.category}
            </span>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-2.5 w-2.5 mr-1" />
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
