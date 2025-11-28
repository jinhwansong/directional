'use client';

import React, { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useGetPosts } from '@/query/usePost';
import { postColumns } from './columns';
import type { PostItem, PostRequest } from '@/types/post';
import type { InfiniteData } from '@tanstack/react-query';
import Link from 'next/link';

interface PostTableProps {
  search: string;
  category: string;
  sort: string;
}

const DEFAULT_SORT = 'createdAt-desc';

export default function PostTable({
  search,
  category,
  sort = DEFAULT_SORT,
}: PostTableProps) {
  const [sortField, sortDirection] = sort.split('-') as [string, string];
  const normalizedCategory =
    !category || category === 'ALL' ? undefined : category;
  const normalizedSearch = search.trim() || undefined;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetPosts({
      search: normalizedSearch,
      category: normalizedCategory,
      sort: sortField || undefined,
      order: (sortDirection === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc',
    });

  const pages =
    ((data as InfiniteData<PostRequest> | undefined)?.pages ?? []) as {
      items: PostItem[];
    }[];
  const posts = pages.flatMap((page) => page.items);
  const [columnPreferences, setColumnPreferences] = useState(() =>
    postColumns.reduce<Record<string, { width: number; visible: boolean }>>(
      (acc, column) => {
        acc[column.key] = {
          width: column.minWidth,
          visible: true,
        };
        return acc;
      },
      {}
    )
  );

  const visibleColumns = useMemo(
    () => postColumns.filter((column) => columnPreferences[column.key]?.visible),
    [columnPreferences]
  );

  const handleWidthChange = (key: string, value: number) => {
    setColumnPreferences((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        width: value,
      },
    }));
  };

  const handleVisibilityToggle = (key: string) => {
    setColumnPreferences((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        visible: !prev[key]?.visible,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-(--pale-gray) bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-(--deep-gray)">
          테이블 설정
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {postColumns.map((column) => (
            <div
              key={column.key}
              className=" rounded-md border border-(--pale-gray) p-3"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-(--font-color)">
                <input
                  type="checkbox"
                  checked={columnPreferences[column.key]?.visible ?? true}
                  onChange={() => handleVisibilityToggle(column.key)}
                  className="h-4 w-4 accent-(--sbl-pink)"
                />
                {column.header}
              </label>
              <div className="mt-3 ">
                <p className="text-xs text-(--medium-gray)">열 너비</p>
                <input
                  type="range"
                  min={120}
                  max={480}
                  value={
                    columnPreferences[column.key]?.width ?? column.minWidth
                  }
                  onChange={(event) =>
                    handleWidthChange(column.key, Number(event.target.value))
                  }
                  className="mt-1 w-full accent-(--sbl-pink)"
                  disabled={!columnPreferences[column.key]?.visible}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-(--pale-gray) rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="flex border-b border-(--pale-gray)">
          {visibleColumns.map((column) => (
            <div
              key={column.key}
              style={{
                width: columnPreferences[column.key]?.width ?? column.minWidth,
              }}
              className="relative flex items-center px-4 py-3 text-[13px] font-semibold text-(--deep-gray) border-r border-(--pale-gray) select-none"
            >
              {column.header}
            </div>
          ))}
        </div>

        <Virtuoso
          style={{ height: 600 }}
          data={posts}
          useWindowScroll={true}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          components={{
            EmptyPlaceholder: () => (
              <div className="px-3 py-10 text-center text-sm text-(--deep-gray)">
                {isLoading
                  ? '데이터를 불러오는 중입니다...'
                  : '표시할 게시글이 없습니다.'}
              </div>
            ),
            Footer: () => (
              <div className="px-3 py-2 text-center text-xs text-(--deep-gray)">
                {isFetchingNextPage
                  ? '다음 데이터를 불러오는 중...'
                  : hasNextPage
                  ? '스크롤하여 더 보기'
                  : ''}
              </div>
            ),
          }}
          itemContent={(_, post) => (
            <div className="flex border-b border-(--pale-gray)">
              {visibleColumns.map((column) => (
                <Link
                  href={`/dashboard/posts/${post.id}`}
                  key={column.key}
                  style={{
                    width:
                      columnPreferences[column.key]?.width ?? column.minWidth,
                  }}
                  className="border-r border-(--pale-gray) px-4 py-3 text-sm text-(--font-color) wrap-break-word hover:bg-(--light-gray)"
                >
                  {column.render(post) as React.ReactNode}
                </Link>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
