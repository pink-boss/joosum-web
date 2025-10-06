import { cookies } from 'next/headers';

import { PreviousLoginProvider } from '@/types/auth.types';

import { LoginApple, LoginGoogle } from './components';

export default async function Login() {
  const cookieStore = await cookies();

  const previousLoginProvider = cookieStore.get('previousLoginProvider')?.value as PreviousLoginProvider;

  return (
    <div className="flex flex-col gap-3" data-testid="login">
      <div className="flex flex-col gap-4 pb-5 text-center">
        <h1 className="text-2xl font-bold">주섬 시작하기</h1>
        <div className="font-extrabold text-gray-800">
          <p>원하는 대로 저장하고 관리하는 나만의 링크 아카이빙,</p>
          <p>SNS 로그인으로 빠르게 시작해보세요.</p>
        </div>
      </div>
      <div className="flex w-[335px] flex-col gap-4">
        <LoginApple previousLoginProvider={previousLoginProvider} />
        <LoginGoogle previousLoginProvider={previousLoginProvider} />
      </div>
      {/* <button>카카오로 시작하기</button> */}
      {/* <button onClick={() => handleClick("naver")}>네이버로 시작하기</button> */}
    </div>
  );
}
