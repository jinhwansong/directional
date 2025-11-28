import { FetchPostParams, PostItem, PostRequest } from '@/types/post';
import { apiFetch } from '@/utils/fetcher';
import type { PostFormType } from '@/schemas/postSchema';

export const fetchPosts = async (
  params: FetchPostParams = {}
): Promise<PostRequest> => {
  const query = new URLSearchParams();

  if (params.nextCursor !== undefined && params.nextCursor !== null) {
    query.append('nextCursor', params.nextCursor);
  }
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.sort) query.append('sort', params.sort);
  if (params.order) query.append('order', params.order);

  const queryString = query.toString() ? `?${query.toString()}` : '';

  return apiFetch<PostRequest>(`posts${queryString}`, {
    method: 'GET',
  });
};

export const fetchPostById = async (id: string): Promise<PostItem> => {
  return apiFetch<PostItem>(`posts/${id}`, {
    method: 'GET',
  });
};

export const deletePostById = async (id: string): Promise<void> => {
  return apiFetch<void>(`posts/${id}`, {
    method: 'DELETE',
  });
};

export const createPost = async (data: PostFormType): Promise<PostItem> => {
  return apiFetch<PostItem>('posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updatePost = async (
  id: string,
  data: PostFormType
): Promise<PostItem> => {
  return apiFetch<PostItem>(`posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};