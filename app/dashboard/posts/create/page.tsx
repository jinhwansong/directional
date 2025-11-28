'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/components/posts/PostForm';
import { useCreatePost } from '@/query/usePost';
import type { PostFormType } from '@/schemas/postSchema';

export default function PostCreatePage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreatePost();

  const handleSubmit = async (values: PostFormType) => {
    await mutateAsync(values);
    router.push('/dashboard/posts');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-(--pale-gray) bg-white px-8 py-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-widest text-(--medium-gray)">
          Posts
        </p>
        <h1 className="text-xl font-semibold text-(--font-color)">
          게시글 작성
        </h1>
      </div>
      <PostForm mode="create" onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}

