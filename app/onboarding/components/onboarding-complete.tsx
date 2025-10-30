'use client';

import Image from 'next/image';

interface Props {
  onGoHome: () => void;
}

export default function OnboardingComplete({ onGoHome }: Props) {
  return (
    <main className="mx-auto flex size-full max-w-320 flex-col justify-center px-20">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10">
            <h1 className="text-24-32 font-bold text-black">가입이 완료되었어요.</h1>
          </div>
          <div className="mb-12">
            <Image priority alt="회원가입 완료" height={140} src="/images/img-join.png" width={230} />
          </div>
          <button
            className="w-83.75 rounded-lg bg-primary-500 py-3.75 transition-colors hover:bg-primary-600"
            data-testid="start_signAdditional"
            type="button"
            onClick={onGoHome}
          >
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-white">주섬 시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
