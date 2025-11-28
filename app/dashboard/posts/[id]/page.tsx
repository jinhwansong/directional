'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/utils/helpers';
import { useDeletePost, useGetPost } from '@/query/usePost';
import Button from '@/components/common/Button';

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = params?.id;

  const {
    data: post,
    isLoading,
  } = useGetPost(postId as string);
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

  const metaInfo = useMemo(() => {
    if (!post) return [];
    return [
      { label: '카테고리', value: post.category },
      { label: '작성자', value: post.userId },
      { label: '작성일', value: formatDate(post.createdAt) },
    ];
  }, [post]);

  const handleDelete = useCallback(async () => {
    if (!postId) return;
    const confirmed = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;
    await deletePost(postId);
    router.push('/dashboard/posts');
  }, [deletePost, postId, router]);

  if (!postId) {
    return (
      <div className="rounded-xl border border-(--pale-gray) bg-white p-6 text-(--font-color)">
        유효하지 않은 게시글입니다.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-(--pale-gray) bg-white p-6 text-(--font-color)">
        게시글을 불러오는 중입니다...
      </div>
    );
  }


  if (!post) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-(--deep-gray)">
        <p className="text-xs uppercase tracking-widest text-(--medium-gray)">
          Posts / {post.id}
        </p>
        <h1 className="text-2xl font-semibold text-(--font-color)">
          {post.title}
        </h1>
      </div>

      <div className="rounded-2xl border border-(--pale-gray) bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm text-(--deep-gray)">
              {metaInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-(--medium-gray)">{item.label}</span>
                  <span className="font-medium text-(--font-color)">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags?.length ? (
                post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-(--light-gray) px-3 py-1 text-xs font-medium text-(--font-color)"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-(--medium-gray)">
                  등록된 태그가 없습니다.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/dashboard/posts/${postId}/edit`}
              className="rounded-md bg-(--soft-gray) px-4 py-2 text-sm font-medium text-(--font-color) transition hover:bg-(--pale-gray)"
            >
              수정하기
            </Link>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              variant="primary"
              size="sm"
            >
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </Button>
          </div>
        </div>

        <div className="mt-8   text-(--font-color) leading-relaxed">
          <div className="whitespace-pre-wrap">{post.body}</div>
        </div>
      </div>
    </div>
  );
}

