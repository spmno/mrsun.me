'use client';

import { useState } from 'react';
import { PostList } from '@/components/post-list';
import { Pagination } from '@/components/pagination';
import type { PostMeta } from '@/lib/posts';

const PER_PAGE = 10;

export function PaginatedPostList({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const current = posts.slice(start, start + PER_PAGE);

  return (
    <>
      <PostList posts={current} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath=""
        onPageChange={setPage}
      />
    </>
  );
}
