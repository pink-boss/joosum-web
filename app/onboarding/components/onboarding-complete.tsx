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
          {/* 텍스트 섹션 */}
          <div className="mb-10">
            <p className="text-2xl font-bold text-black">가입이 완료되었어요.</p>
          </div>
          {/* 메인 이미지 */}
          <div className="mb-12">
            <Image priority alt="회원가입 완료" height={140} src="/images/img-join.png" width={230} />
          </div>
          {/* 시작하기 버튼 */}
          <button
            className="w-83.75 rounded-lg bg-primary-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600"
            data-testid="start_signAdditional"
            type="button"
            onClick={onGoHome}
          >
            주섬 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}
