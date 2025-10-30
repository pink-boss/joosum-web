import { cookies } from 'next/headers';

import { PreviousLoginProvider } from '@/types/auth.types';

import { LoginApple, LoginGoogle } from './components';

export default async function Login() {
  const cookieStore = await cookies();

  const previousLoginProvider = cookieStore.get('previousLoginProvider')?.value as PreviousLoginProvider;

  return (
    <div className="flex flex-col gap-3" data-testid="login">
      <div className="flex flex-col gap-4 pb-5 text-center">
        <h1 className="text-24-32 font-bold text-black">주섬 시작하기</h1>
        <span className="text-16-19 font-normal text-gray-800">
          원하는 대로 저장하고 관리하는 나만의 링크 아카이빙,
          <br />
          SNS 로그인으로 빠르게 시작해보세요.
        </span>
      </div>
      <div className="flex w-83.75 flex-col gap-4">
        <LoginApple previousLoginProvider={previousLoginProvider} />
        <LoginGoogle previousLoginProvider={previousLoginProvider} />
      </div>
    </div>
  );
}
