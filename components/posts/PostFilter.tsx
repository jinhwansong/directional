'use client';

import { useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchSchema } from '@/schemas/searchSchema';
import { z } from 'zod';

interface PostFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

type SearchFormValues = z.infer<typeof SearchSchema>;

const categoryOptions = [
  { label: '전체', value: 'ALL' },
  { label: 'NOTICE', value: 'NOTICE' },
  { label: 'QNA', value: 'QNA' },
  { label: 'FREE', value: 'FREE' },
];

const sortOptions = [
  { label: '제목 오름차순', value: 'title-asc' },
  { label: '제목 내림차순', value: 'title-desc' },
  { label: '생성일 최신순', value: 'createdAt-desc' },
  { label: '생성일 오래된순', value: 'createdAt-asc' },
];

export default function PostFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: PostFilterProps) {
  const {
    register,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search,
    },
  });

  const watchedSearch = useWatch({
    control,
    name: 'search',
  }) ?? '';

  useEffect(() => {
    setValue('search', search);
  }, [search, setValue]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      const isValid = await trigger('search');
      if (isValid && watchedSearch !== search) {
        onSearchChange(watchedSearch || '');
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [watchedSearch, trigger, onSearchChange, search]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="rounded-md border border-(--pale-gray) bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className=" flex-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--medium-gray)" />
              <input
                type="text"
                placeholder="제목 또는 본문 검색..."
                className="w-full rounded-lg border border-(--pale-gray) bg-white pl-10 pr-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
                {...register('search')}
              />
            </div>
            {errors.search && (
              <p className="mt-1 text-xs text-red-500">
                {errors.search.message}
              </p>
            )}
          </div>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-lg border border-(--pale-gray) bg-white px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none  focus:ring-(--sbl-pink)"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={handleSortChange}
            className="rounded-lg border border-(--pale-gray) bg-white px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/dashboard/posts/create"
          className="inline-flex items-center justify-center rounded-md bg-(--sbl-pink) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--danger-color)"
        >
          게시글 작성
        </Link>
      </div>
    </div>
  );
}

