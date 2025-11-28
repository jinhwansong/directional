export async function apiFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('token'))
          ?.split('=')[1]
      : null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/${url.replace(/^\//, '')}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    }
  );

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'API error');
  }

  return res.json() as Promise<T>;
}
