'use client';

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PostCreateSchema,
  PostEditSchema,
  type PostFormType,
} from '@/schemas/postSchema';
import Button from '../common/Button';

interface PostFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Partial<PostFormType>;
  onSubmit: (data: PostFormType) => Promise<void> | void;
  isSubmitting?: boolean;
}

const categoryOptions = [
  { value: 'NOTICE', label: '공지' },
  { value: 'QNA', label: 'Q&A' },
  { value: 'FREE', label: '자유' },
] as const;

export default function PostForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  const schema = useMemo(
    () => (mode === 'create' ? PostCreateSchema : PostEditSchema),
    [mode]
  );

  const form = useForm<PostFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      category: 'NOTICE',
      tags: [],
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;
  const tagsInputRef = useRef<HTMLInputElement>(null);
  const initialTags = useMemo(
    () => (defaultValues?.tags ?? []).join(', '),
    [defaultValues?.tags]
  );

  useEffect(() => {
    if (tagsInputRef.current) {
      tagsInputRef.current.value = initialTags;
    }
    setValue('tags', defaultValues?.tags ?? [], { shouldValidate: true });
  }, [defaultValues?.tags, initialTags, setValue]);

  const handleTagsChange = (value: string) => {
    const parsed = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    setValue('tags', parsed, { shouldValidate: true });
  };

  const renderFieldError = (error?: { message?: string }): ReactNode =>
    error?.message ? (
      <p className="text-xs text-red-500">{error.message}</p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          tags: values.tags ?? [],
        });
      })}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-(--font-color) block">
          제목
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-(--pale-gray) px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
          placeholder="제목을 입력해주세요"
          {...register('title')}
        />
        {renderFieldError(errors.title)}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-(--font-color) block">
          카테고리
        </label>
        <select
          className="w-full rounded-md border border-(--pale-gray) px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
          {...register('category')}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {renderFieldError(errors.category)}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-(--font-color)  block">
          본문
        </label>
        <textarea
          rows={10}
          className="w-full rounded-md border border-(--pale-gray) px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
          placeholder="본문을 입력해주세요"
          {...register('body')}
        />
        {renderFieldError(errors.body)}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-(--font-color) block">
          태그 (최대 5개, 콤마로 구분)
        </label>
        <input
          type="text"
          ref={tagsInputRef}
          defaultValue={initialTags}
          onChange={(event) => handleTagsChange(event.target.value)}
          className="w-full rounded-md border border-(--pale-gray) px-3 py-2 text-sm text-(--font-color) focus:border-(--sbl-pink) focus:outline-none focus:ring-(--sbl-pink)"
          placeholder="ex) 금융, 핀테크, 리스크"
        />
        {renderFieldError(errors.tags)}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size='sm'
        >
          {isSubmitting
            ? '처리 중...'
            : mode === 'create'
            ? '게시글 생성'
            : '게시글 수정'}
        </Button>
      </div>
    </form>
  );
}

