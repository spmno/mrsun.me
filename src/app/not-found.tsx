import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-foreground/80 mb-2">页面未找到</p>
        <p className="text-muted-foreground mb-8">
          你访问的页面可能已被移动或删除
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="default" className="gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Button>
          </Link>
          <Link href="/search/">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              搜索文章
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
