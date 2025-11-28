'use client';

import { useRouter, useParams } from 'next/navigation';
import PostForm from '@/components/posts/PostForm';
import { useGetPost, useUpdatePost } from '@/query/usePost';
import type { PostFormType } from '@/schemas/postSchema';

export default function PostEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = params?.id ?? '';

  const { data: post, isLoading } = useGetPost(postId);
  const { mutateAsync, isPending } = useUpdatePost(postId);

  const handleSubmit = async (values: PostFormType) => {
    await mutateAsync(values);
    router.push(`/dashboard/posts/${postId}`);
  };

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
        게시글 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="rounded-xl border border-(--pale-gray) bg-white p-6 text-(--font-color)">
        게시글 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-(--pale-gray) bg-white px-8 py-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-widest text-(--medium-gray) mb-2">
          Posts / {post.id}
        </p>
        <h1 className="text-xl font-semibold text-(--font-color)">
          게시글 수정
        </h1>
      </div>
      <PostForm
        mode="edit"
        defaultValues={{
          title: post.title,
          body: post.body,
          category: post.category,
          tags: post.tags,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}

