import { z } from 'zod';

const bannedWords = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

const bannedChecker = (value: string) => {
  return !bannedWords.some((word) => value.includes(word));
};

export const PostBaseSchema = {
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(80, '제목은 최대 80자입니다.')
    .refine(bannedChecker, '금칙어가 포함되어 있습니다.'),
  body: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(2000, '본문은 최대 2000자입니다.')
    .refine(bannedChecker, '금칙어가 포함되어 있습니다.'),
  category: z.enum(['NOTICE', 'QNA', 'FREE']),
  tags: z.array(z.string().max(24)).max(5),
};

export const PostCreateSchema = z.object(PostBaseSchema);
export const PostEditSchema = z.object(PostBaseSchema);

export type PostFormType = z.infer<typeof PostCreateSchema>;