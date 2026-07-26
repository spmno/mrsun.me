'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLocale } from '@/components/locale-provider';
import { t } from '@/lib/i18n';
import { siteConfig, siteConfigEn } from '@/lib/site';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const config = locale === 'en' ? siteConfigEn : siteConfig;
  const navItems = config.nav;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t(locale, 'openMenu')}</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-background">
        <SheetTitle className="text-left text-lg font-semibold">
          {config.title}
        </SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-foreground/80 hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-accent/50"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-border pt-6">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
