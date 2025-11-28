'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '@/schemas/loginSchema';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { login } from '@/libs/login';
import { useToastStore } from '@/stores/useToast';

export default function LoginForm() {
  const router = useRouter();
  const {show} = useToastStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data);
      router.push('/dashboard/posts');
    } catch {
      show('로그인에 실패했습니다', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="space-y-5">
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        fullWidth
      >
        로그인
      </Button>
    </form>
  );
}

