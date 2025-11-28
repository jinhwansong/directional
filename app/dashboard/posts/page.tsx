'use client';

import { useCallback, useState } from 'react';
import PostFilter from '@/components/posts/PostFilter';
import PostTable from '@/components/posts/PostTable';

const DEFAULT_SORT = 'createdAt-desc';

export default function PostsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState(DEFAULT_SORT);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
  }, []);

  return (
    <div className="space-y-4 pt-6">
      <div>
        <h1 className="text-2xl font-bold text-(--font-color)">게시글 관리</h1>
        <p className="mt-1 text-sm text-(--deep-gray)">
          게시글을 검색하고 필터링하여 한눈에 확인하세요.
        </p>
      </div>

      <PostFilter
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      <PostTable search={search} category={category} sort={sort} />
    </div>
  );
}
