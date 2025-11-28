import { apiFetch } from '@/utils/fetcher';
import { type LoginSchema } from '@/schemas/loginSchema';
import { LoginResponse } from '@/types/login';

export const login = async (data: LoginSchema): Promise<LoginResponse> => {
  const result = await apiFetch<LoginResponse>('auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: result.token }),
  });

  return result;
};
