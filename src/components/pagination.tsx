import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > 7;

  if (!showEllipsis) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const getPageHref = (p: number) =>
    p === 1 ? basePath : `${basePath}pages/${p}/`;

  const go = (p: number) => {
    if (onPageChange) onPageChange(p);
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 &&
        (onPageChange ? (
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => go(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Link href={getPageHref(currentPage - 1)}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        ))}
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          onPageChange ? (
            <Button
              key={i}
              variant={p === currentPage ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8 text-sm"
              onClick={() => go(p)}
            >
              {p}
            </Button>
          ) : (
            <Link key={i} href={getPageHref(p)}>
              <Button
                variant={p === currentPage ? 'default' : 'outline'}
                size="icon"
                className="h-8 w-8 text-sm"
              >
                {p}
              </Button>
            </Link>
          )
        ) : (
          <span key={i} className="px-1 text-muted-foreground">
            {p}
          </span>
        )
      )}
      {currentPage < totalPages &&
        (onPageChange ? (
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => go(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link href={getPageHref(currentPage + 1)}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ))}
    </nav>
  );
}
