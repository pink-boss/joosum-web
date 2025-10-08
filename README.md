## Joosum Web

## CLI

1. 의존성 설치

```bash
npm install
```

2. 개발 서버

```bash
npm run dev
# http://localhost:3000
```

애플 로그인은 로컬 개발시 localhost를 지원하지 않아, ngrok으로 개발. 애플과 구글 계정에 다음 경로가 등록되어 있음. (https://ngrok.com/ 구독 필요)

```bash
ngrok http --url=perfect-subtle-jawfish.ngrok-free.app 3000
# https://perfect-subtle-jawfish.ngrok-free.app/
```

3. 스토리북

```bash
npm run storybook
# http://localhost:6006
```

4. 테스트

CI/CD에 테스트가 포함되진 않았습니다.

```bash
npm test             # Jest 단위 테스트
npm run test-storybook  # Storybook Test Runner
```

5. 프로덕션 빌드/실행

```bash
npm run build
npm start
```

---

### 기술 스택

- **프레임워크**: Next.js 15(App Router) + React 18
- **스타일**: Tailwind CSS
- **상태/데이터**: React Query, Zustand
- **인증**: Google/Apple OAuth
- **스토리북/테스트**: Storybook + MSW, Jest

## 아키텍처 개요

### 라우팅(App Router)

- 디렉터리: `app/`
- API Route Handlers: `app/api/**/route.ts`
- 레이아웃: `app/layout.tsx`에서 전역 폰트/스타일, React Query Provider, GTM, 토스트/다이얼로그, 사이드바/탑바를 구성
- 퍼블릭 전용 경로 여부에 따라 레이아웃 분기(`publicOnlyPaths`)

### 인증 흐름(OAuth → 토큰)

```
로그인 페이지 → 애플/구글 로그인 페이지 → 클라이언트 콜백 경로(idToken) → 서버에 사용자 정보 확인
  → 서버에 로그인 요청(accessToken) → accessToken 쿠키에 저장
  → 클라이언트 온보딩 페이지 리디렉션(idToken) → 서버에 회원가입 요청(accessToken) → accessToken 쿠키에 저장
```

경로와 유틸을 중심으로 요약합니다. (refreshToken 사용 X)

- 로그인 버튼: `app/login/google.tsx`, `app/login/apple.tsx`
- 콜백 핸들러: `app/auth/callback/google/route.ts`, `app/auth/callback/apple/route.ts`
  - Google: 인가 코드 → 구글 토큰 교환 → `idToken` 획득 → `isExist(idToken)`로 가입 여부 확인 →
    - 미가입: `idToken`/`social`을 쿠키에 저장 후 온보딩(`/onboarding`)으로 리다이렉트
    - 가입: 서버 `POST /api/auth/google/web` 요청 → `accessToken` httpOnly 쿠키 저장 → `/` 리다이렉트
  - Apple: POST로 전달된 `id_token` 처리 → 동일한 분기
- 쿠키/토큰 유틸: `utils/auth/auth.ts`
  - `storeAccessToken`: httpOnly, `sameSite=lax`, prod에서 `secure` 지정
  - `logout`: `accessToken` 삭제
- 클라이언트 도메인/서버 도메인: `utils/envUri.ts` (`NEXT_PUBLIC_JOOSUM_WEB_URI`, `JOOSUM_SERVER_URI`)

주의

- `accessToken`은 기본적으로 httpOnly라 클라이언트에서 직접 읽기 어렵습니다. 클라이언트 토큰 의존 로직 대신, 미들웨어 가드/서버 API를 통해 권한을 확인하세요.

### 미들웨어 경로 가드

- 파일: `middleware.ts`, 경로 상수: `utils/path.ts`
- 기본 리다이렉트: `/` → `/dashboard`
- 보호 경로: `['/dashboard','/my-folder','/link-book']`
- 퍼블릭 경로: `['/login','/onboarding','/auth/callback']`
- 비로그인 사용자가 보호 경로 접근 시 `/login` 경로로 리다이렉트
- 로그인 사용자가 퍼블릭 전용 경로 접근 시 기본 경로로 이동

### 데이터 패칭 패턴

- 서버 측 API 프록시: `utils/api.ts`의 `serverApi()`
  - `JOOSUM_SERVER_URI`로 전달, `accessToken` 자동 헤더 주입
- React Query v5: `app/layout.tsx`에서 `QueryClientProvider` 주입, 기본 옵션 튜닝(캐시/재시도 등)
- 쿼리 키: `utils/queryKey.ts` 제공

### 전역 상태(Zustand)

- 디렉터리: `libs/zustand/**`
- 다이얼로그/드로어 열림 상태, 검색/필터, 정렬 상태 등을 모듈별 스토어로 관리

### UI/스타일

- Tailwind 설정: `tailwind.config.ts` (컬러 팔레트, 스크린, 폰트 변수)
- 전역 CSS: `app/globals.css`
- 폰트: `PretendardVariable.woff2` (로컬, `next/font/local`)

### 스토리북 + MSW

- 스토리: `stories/**`
- 목 데이터: `stories/mocks/**`, `msw-storybook-addon`

---

## 디렉터리 구조

```text
app/                  # 페이지 UI
  api/                # API Route Handlers (Next.js)
  auth/callback/*     # OAuth 콜백 라우트(google, apple)
  login/*             # 로그인 UI
  dashboard/*         # 대시보드 UI
  link-book/*         # 링크 UI
  my-folder/*         # 폴더 UI
components/           # UI 컴포넌트
  ...
constants/            # 상수 정의
hooks/                # 커스텀 훅
  utils/*             # 훅 유틸리티
  zustand/*           # Zustand 관련 훅
layouts/              # 레이아웃 컴포넌트
  ...
libs/                 # 라이브러리 설정
  tanstack-query/*    # React Query 설정
  zustand/*           # Zustand 스토어
services/             # API 훅
  ...
types/                # 타입 정의
utils/                # 유틸리티 함수
  ...
assets/               # 정적 에셋
  icons/              # 아이콘 SVG 파일들
stories/              # Storybook 스토리/목 데이터
public/               # 정적 리소스, MSW 워커
middleware.ts         # 경로 가드
```

---

## 개발 가이드

### 서버 API 연동

- 서버로 전달할 엔드포인트 문자열만 `serverApi({ path, ... })`에 넘기면 됩니다.
- 쿠키의 `accessToken`이 자동 주입됩니다(미로그인 시 401 유사 응답).

---

## 테스트 전략

- 단위 테스트(Jest + Testing Library)
  - 로직 테스트에 사용
  - 테스트 위치: `__tests__/**` 또는 `*.test.ts(x)`

- Storybook Test Runner
  - 스토리 상호작용/회귀 테스트에 사용
  - 테스트 위치: `stories/**` 또는 `*.stories.ts(x)`
  - `npm run test-storybook`

---

## 배포 전략

- main 원격 브런치에 코드를 푸쉬하면 서버로 자동 배포. 만약 배포에 실패하면 저장소에서 failed jobs만 재실행.
- 용량이 크기 때문에 volume 관련 에러가 날시에 vm docker image 삭제

---
