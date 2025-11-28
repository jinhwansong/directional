import { z } from 'zod';

const bannedWords = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];
const bannedChecker = (value: string) => {
  return !bannedWords.some((word) => value.includes(word));
};

export const SearchSchema = z.object({
  search: z
    .string()
    .max(100, '검색어는 최대 100자입니다.')
    .refine(bannedChecker, '금칙어가 포함된 검색은 허용되지 않습니다.')
    .optional(),
});
