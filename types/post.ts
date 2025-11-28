export interface PostItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: 'NOTICE' | 'QNA' | 'FREE';
  tags: string[];
  createdAt: string;
}

export interface PostRequest {
  items: PostItem[];
  prevCursor?: string | null;
  nextCursor?: string | null;
  cursor?: string | null;
}

export interface FetchPostParams {
  nextCursor?: string;
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}