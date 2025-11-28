import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { message: '토큰이 필요합니다' },
        { status: 400 }
      );
    }

    // 쿠키에 토큰 저장
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch  {
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

