"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";

interface CompletionScreenProps {
  onGoHome: () => void;
}

export default function CompletionScreen({ onGoHome }: CompletionScreenProps) {
  const onClickStart = () => {
    sendGTMEvent({
      event: "click.start_signAddtional",
    });
    onGoHome();
  };
  return (
    <main className="mx-auto flex size-full max-w-[1280px] flex-col justify-center px-20">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center text-center">
          {/* 텍스트 섹션 */}
          <div className="mb-10">
            <p className="text-2xl font-bold text-black">
              가입이 완료되었어요.
            </p>
          </div>

          {/* 메인 이미지 */}
          <div className="mb-12">
            <Image
              src="/img-join.svg"
              alt="회원가입 완료"
              width={230}
              height={140}
              priority
            />
          </div>

          {/* 시작하기 버튼 */}
          <button
            onClick={onClickStart}
            className="w-[335px] rounded-lg bg-primary-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600"
          >
            주섬 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}
