import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export function AuthorBio() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {siteConfig.author.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{siteConfig.author}</h3>
          <p className="text-xs text-muted-foreground">博主</p>
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        {siteConfig.description}
      </p>
      {siteConfig.social.github && (
        <Link
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <Code2 className="h-3.5 w-3.5" />
          GitHub
        </Link>
      )}
    </div>
  );
}
