'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { siteConfig } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-primary">
            {siteConfig.title}
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-1.5 text-sm rounded-md transition-colors
                    ${isActive
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground'
                    }
                  `}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
            <ThemeToggle />
          </div>
          {siteConfig.social.github && (
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center size-8 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground/60 hover:text-foreground transition-colors"
            >
              <Code2 className="h-4 w-4" />
            </Link>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
