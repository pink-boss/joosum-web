"use client";

import Link from "next/link";

import AgreementCheckbox from "./AgreementCheckbox";

interface TermsAgreementProps {
  agreements: {
    all: boolean;
    terms: boolean;
    privacy: boolean;
  };
  onAllAgreement: () => void;
  onIndividualAgreement: (type: "terms" | "privacy") => void;
  onStart: () => void;
  isStartButtonEnabled: boolean;
}

export default function TermsAgreement({
  agreements,
  onAllAgreement,
  onIndividualAgreement,
  onStart,
  isStartButtonEnabled,
}: TermsAgreementProps) {
  return (
    <main className="mx-auto flex size-full max-w-[1280px] flex-col justify-center gap-8 px-20">
      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold leading-8 text-black">
          서비스 이용을 위한
          <br />
          이용약관 동의
        </h1>
        <p className="text-base leading-[19px] text-gray-ink">
          서비스 이용을 위해 약관 및 정보제공에 동의해주세요.
        </p>
      </div>

      {/* 약관 동의 섹션 */}
      <div className="flex flex-col items-center">
        <div className="w-[335px]">
          {/* 전체 동의 */}
          <div className="mb-6">
            <div
              className="flex h-12 w-full cursor-pointer items-center rounded-lg bg-gray-ghost px-4"
              onClick={onAllAgreement}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-6 items-center justify-center rounded-full border-2 ${
                    agreements.all
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {agreements.all && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path
                        d="M1 4.5L4.5 8L11 1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-base font-bold text-gray-black">
                  전체 동의
                </span>
              </div>
            </div>
          </div>

          {/* 개별 약관 */}
          <div className="mb-9 space-y-4 pl-4">
            {/* 서비스 이용약관 */}
            <AgreementCheckbox
              isChecked={agreements.terms}
              label="서비스 이용약관 동의"
              link="https://joosum.notion.site/6df241a6e3174b8fbfc7933a506a0b1e"
              onClick={() => onIndividualAgreement("terms")}
            />

            {/* 개인정보 수집 및 이용 동의 */}
            <AgreementCheckbox
              isChecked={agreements.privacy}
              label="개인정보 수집 및 이용 동의"
              link="https://joosum.notion.site/33975a64eb55468ea523f707353743cf"
              onClick={() => onIndividualAgreement("privacy")}
            />
          </div>

          {/* 시작하기 버튼 */}
          <button
            onClick={onStart}
            disabled={!isStartButtonEnabled}
            className={`flex h-14 w-full items-center justify-center gap-2 rounded-lg text-lg font-semibold transition-all ${
              isStartButtonEnabled
                ? "cursor-pointer bg-primary-500 text-white hover:bg-primary-600"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
          >
            동의하고 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}
