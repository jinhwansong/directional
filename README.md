# Directional Dashboard

금융 SaaS 스타일의 대시보드 애플리케이션으로, 게시글 관리 및 데이터 분석 기능을 제공합니다.

## 🚀 프로젝트 실행 방법

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 🛠 기술 스택

### 프레임워크 & 언어
- **Next.js 16.0.5** - App Router 기반 React 프레임워크
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 스타일링
- **Tailwind CSS v4** - 유틸리티 기반 CSS 프레임워크
- **CSS Variables** - 커스텀 색상 팔레트 관리

### 폼 관리 & 검증
- **React Hook Form 7.66.1** - 폼 상태 관리
- **Zod 4.1.13** - 스키마 검증
- **@hookform/resolvers 5.2.2** - Zod 통합

### 데이터 페칭 & 상태 관리
- **@tanstack/react-query 5.90.11** - 서버 상태 관리 및 캐싱
- **Zustand 5.0.8** - 클라이언트 전역 상태 관리 (Toast)

### UI 컴포넌트
- **@radix-ui/react-*** - 접근성 우선 UI 컴포넌트
  - `@radix-ui/react-select`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-tooltip`
- **lucide-react 0.555.0** - 아이콘 라이브러리
- **framer-motion 12.23.24** - 애니메이션

### 차트 & 데이터 시각화
- **Recharts 3.5.0** - 차트 라이브러리

### 테이블 & 가상화
- **react-virtuoso 4.15.0** - 가상화된 리스트/테이블
- **@tanstack/react-table 8.21.3** - 테이블 유틸리티 (타입 정의용)

### 유틸리티
- **axios 1.13.2** - HTTP 클라이언트
- **clsx 2.1.1** - 조건부 클래스명 유틸리티

## ✨ 주요 구현 기능

### 1. 인증 시스템
- **로그인 페이지**: 카카오뱅크 스타일 UI
- **쿠키 기반 인증**: httpOnly 쿠키를 통한 안전한 토큰 관리
- **API 프록시**: Next.js API Route를 통한 백엔드 통신
- **폼 검증**: React Hook Form + Zod를 통한 실시간 검증
- **에러 처리**: Toast 알림을 통한 사용자 피드백

### 2. 게시글 관리 시스템

#### 게시글 목록 (`/dashboard/posts`)
- **무한 스크롤**: Cursor 기반 페이지네이션
- **검색 기능**: 제목/본문 검색 (Debounce 300ms)
- **카테고리 필터**: 전체 / NOTICE / QNA / FREE
- **정렬 옵션**: 제목/생성일 기준 오름차순/내림차순
- **가상화 테이블**: `react-virtuoso`를 통한 대용량 데이터 효율적 렌더링
- **컬럼 리사이징**: 드래그를 통한 컬럼 너비 조절
- **컬럼 가시성 토글**: 특정 컬럼 숨김/보임 기능

#### 게시글 상세 (`/dashboard/posts/[id]`)
- **게시글 조회**: React Query를 통한 데이터 페칭
- **로딩/에러 상태**: 사용자 친화적인 상태 표시
- **게시글 삭제**: 확인 다이얼로그 후 삭제

#### 게시글 생성/수정 (`/dashboard/posts/create`, `/dashboard/posts/[id]/edit`)
- **공통 폼 컴포넌트**: 생성/수정 모드 지원
- **필드**: 제목, 본문, 카테고리, 태그 (콤마 구분)
- **실시간 검증**: Zod 스키마 기반 금칙어 필터링
- **태그 변환**: 문자열 입력을 배열로 자동 변환

### 3. 데이터 분석 대시보드 (`/dashboard/charts`)

#### 바 & 도넛 인사이트
- **인기 커피 브랜드**: 바 차트 + 도넛 차트
- **인기 간식 브랜드**: 바 차트 + 도넛 차트
- **X축 라벨 회전**: 긴 브랜드명 가독성 향상

#### 스택형 분포
- **감정 분포**: 주간 감정 트렌드 (happy, tired, stressed) - 100% 스택형
- **운동 습관 분포**: 주간 운동 트렌드 (running, cycling, stretching) - 100% 스택형
- **스택형 바 차트 & 스택형 면적 차트**: 두 가지 시각화 제공

#### 업무 영향 분석
- **커피 섭취 vs 업무 영향**: 팀별 커피 소비량과 버그/생산성 관계 분석
- **스낵 섭취 vs 협업 영향**: 부서별 간식 소비량과 미팅/생산성 관계 분석
- **멀티라인 차트**:
  - X축: 소비량 (커피 잔수 / 스낵 개수)
  - 왼쪽 Y축: Bugs, MeetingMissed (실선, 원형 마커)
  - 오른쪽 Y축: Productivity, Morale (점선, 사각형 마커)
  - 팀별 색상 구분
  - 호버 시 툴팁 표시 x
- **공통 작업요구 사항**:
  - Legend(범례) 표시
  - 데이터 보이기/숨기기 기능 x
  - 색상 변경 기능 x

### 4. 대시보드 레이아웃
- **반응형 사이드바**: 데스크톱 고정, 모바일 드로어 형태
- **헤더**: 페이지 타이틀 및 사용자 메뉴 영역
- **네비게이션**: 현재 경로 기반 활성 상태 표시
- **통일된 디자인**: 금융 SaaS 스타일의 안정적인 UI

### 5. 공통 컴포넌트
- **Button**: 다양한 variant, size, loading 상태 지원
- **Input**: 라벨, 에러, helper text 지원
- **Toast**: Zustand 기반 전역 알림 시스템

### 6. 코드 구조
- **API 레이어 분리**: `libs/` 디렉토리에 API 호출 함수 집중
- **React Query 훅**: `query/` 디렉토리에 데이터 페칭 로직 분리
- **타입 안정성**: TypeScript 인터페이스로 API 응답 타입 정의
- **스키마 검증**: Zod를 통한 런타임 타입 검증

## 📁 프로젝트 구조

```
directional/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # 대시보드 페이지
│   │   ├── charts/        # 차트 페이지
│   │   └── posts/         # 게시글 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
│   ├── auth/             # 인증 컴포넌트
│   ├── charts/            # 차트 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── posts/             # 게시글 컴포넌트
├── libs/                  # API 호출 함수
├── query/                 # React Query 훅
├── schemas/               # Zod 스키마
├── stores/                # Zustand 스토어
├── types/                 # TypeScript 타입 정의
└── utils/                 # 유틸리티 함수
```

## 🎨 디자인 시스템

프로젝트는 커스텀 색상 팔레트를 사용합니다:

```css
--sbl-pink: #f23d67;
--light-gray: #f6f7f9;
--pale-gray: #edeff2;
--soft-gray: #e2e3e5;
--deep-gray: #717681;
--medium-gray: #a7aab1;
--black-color: #282828;
--font-color: #2f3137;
--dark-gray: #3C4352;
```

## 📝 주요 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 🔐 인증 플로우

1. 사용자가 로그인 폼에 이메일/비밀번호 입력
2. React Hook Form + Zod로 클라이언트 측 검증
3. `/api/login` Next.js API Route로 요청 전송
4. API Route에서 백엔드 `/auth/login` 호출
5. `/dashboard`로 리다이렉트
6. 이후 API 요청 시 쿠키의 토큰을 Authorization 헤더에 포함

## 📊 데이터 페칭 전략

- **React Query**: 서버 상태 관리 및 캐싱
- **Infinite Query**: 게시글 목록의 무한 스크롤 구현
- **Optimistic Updates**: 사용자 경험 향상을 위한 낙관적 업데이트