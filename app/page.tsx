import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--light-gray) px-4 py-8">
      <div className="w-full max-w-[380px] rounded-2xl border border-(--pale-gray) bg-white p-8 shadow-none">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-(--font-color)">로그인</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
