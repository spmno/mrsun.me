'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { siteConfig } from '@/lib/site';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-primary">
            {siteConfig.title}
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {siteConfig.social.github && (
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-foreground/70 hover:text-primary transition-colors"
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
