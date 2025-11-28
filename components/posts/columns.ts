import { PostItem } from '@/types/post';
import { formatDate } from '@/utils/helpers';
import { ReactNode } from 'react';

export interface PostColumn {
  key: keyof PostItem;
  header: string;
  minWidth: number;
  flex: number;
  render: (item: PostItem) => ReactNode;
}

export const postColumns: PostColumn[] = [
  {
    key: 'id',
    header: 'ID',
    minWidth: 140,
    flex: 1,
    render: (item) => item.id,
  },
  {
    key: 'title',
    header: '제목',
    minWidth: 280,
    flex: 2,
    render: (item) => item.title,
  },
  {
    key: 'category',
    header: '카테고리',
    minWidth: 150,
    flex: 1,
    render: (item) => item.category,
  },
  {
    key: 'createdAt',
    header: '작성일',
    minWidth: 180,
    flex: 1,
    render: (item) => formatDate(item.createdAt),
  },
];
