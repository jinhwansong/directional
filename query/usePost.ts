import {
  createPost,
  deletePostById,
  fetchPostById,
  fetchPosts,
  updatePost,
} from '@/libs/post';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { PostItem, PostRequest } from '@/types/post';
import type { PostFormType } from '@/schemas/postSchema';

type PostsQueryKey = [
  'posts',
  string,
  string,
  string,
  string
];

export const useGetPosts = (options?: {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}) => {
  const normalizedFilters = {
    search: options?.search?.trim() || '',
    category: options?.category || '',
    sort: options?.sort || '',
    order: options?.order || '',
  };

  return useInfiniteQuery<
    PostRequest,
    Error,
    PostRequest,
    PostsQueryKey,
    string | undefined
  >({
    queryKey: [
      'posts',
      normalizedFilters.search,
      normalizedFilters.category,
      normalizedFilters.sort,
      normalizedFilters.order,
    ],
    queryFn: ({ pageParam }) =>
      fetchPosts({
        nextCursor: pageParam,
        search: normalizedFilters.search || undefined,
        category: normalizedFilters.category || undefined,
        sort: normalizedFilters.sort || undefined,
        order: (normalizedFilters.order as 'asc' | 'desc') || undefined,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage?.nextCursor ?? lastPage?.cursor ?? null;
      return nextCursor ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useGetPost = (id: string) => {
  return useQuery<PostItem>({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: Boolean(id),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePostById(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormType) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormType) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};