'use client';

import { useCallback } from 'react';

import { clsx } from '@/utils/clsx';

import { ChevronDownIcon } from '@/assets/icons';

interface Props {
  selectedGender: string;
  selectedYear: string;
  isLoading: boolean;
  onGenderSelect: (gender: string) => void;
  onYearSelect: (year: string) => void;
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingUserInfoForm(props: Props) {
  const { selectedGender, selectedYear, isLoading, onGenderSelect, onYearSelect, onComplete, onSkip } = props;

  const handleGenderSelect = useCallback(
    (gender: string) => {
      onGenderSelect(gender);
    },
    [onGenderSelect],
  );

  const handleYearSelect = useCallback(
    (year: string) => {
      onYearSelect(year);
    },
    [onYearSelect],
  );

  return (
    <main className="mx-auto flex size-full max-w-320 flex-col justify-center gap-8 px-20" data-testid="signAdditional">
      <div className="text-center">
        <h1 className="mb-4 text-24-32 font-bold text-black">
          만나서 반가워요!
          <br />
          성별과 연령을 입력해주세요
        </h1>
        <h2 className="text-16-19 font-normal text-gray-800">
          입력한 성별/연령 정보는 주섬 앱 개선을 위해서만
          <br />
          사용되며 다른 용도로 사용되지 않아요.
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="w-83.75">
          <section className="mb-8">
            <h3 className="mb-4 text-18-26 font-semibold tracking-[-0.2px] text-gray-900">성별을 선택해주세요</h3>
            <div className="flex gap-2">
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('male')}
                className={clsx(
                  'flex h-12 w-26 items-center justify-center rounded-lg',
                  selectedGender === 'male' ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-700',
                )}
              >
                <span className="text-16-24 font-semibold tracking-[-0.2px] text-inherit">남자</span>
              </button>
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('female')}
                className={clsx(
                  'flex h-12 w-26 items-center justify-center rounded-lg',
                  selectedGender === 'female' ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-700',
                )}
              >
                <span className="text-16-24 font-semibold tracking-[-0.2px] text-inherit">여자</span>
              </button>
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('other')}
                className={clsx(
                  'flex h-12 w-26 items-center justify-center rounded-lg',
                  selectedGender === 'other' ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-700',
                )}
              >
                <span className="text-16-24 font-semibold tracking-[-0.2px] text-inherit">기타</span>
              </button>
            </div>
          </section>
          <section className="mb-8">
            <h3 className="mb-4 text-18-26 font-semibold tracking-[-0.2px] text-gray-900">출생연도를 선택해주세요</h3>
            <div className="relative">
              <select
                className="h-12 w-full appearance-none rounded-lg bg-gray-200 px-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                data-testid="selectBirthyear_signAdditional"
                value={selectedYear}
                onChange={(e) => handleYearSelect(e.target.value)}
              >
                {Array.from({ length: 80 }, (_, i) => {
                  const year = 2024 - i;
                  return (
                    <option key={year} value={`${year}년`}>
                      {year}년
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <ChevronDownIcon aria-hidden="true" className="size-6 text-gray-500" />
              </div>
            </div>
          </section>
          <button
            className="mb-4 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            disabled={isLoading}
            type="button"
            onClick={onComplete}
          >
            {isLoading ? (
              <>
                <div className="size-5 animate-spin rounded-full border-2 border-gray-200 border-t-white" />
                <span className="text-18-26 font-semibold tracking-[-0.2px] text-inherit">처리중...</span>
              </>
            ) : (
              <>
                <span className="text-18-26 font-semibold tracking-[-0.2px] text-inherit">완료</span>
              </>
            )}
          </button>
          <div className="text-center">
            <button
              className="text-gray-800 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-500"
              data-testid="skip_signAdditional"
              disabled={isLoading}
              type="button"
              onClick={onSkip}
            >
              <span className="text-16-19 font-normal text-inherit">{isLoading ? '처리중...' : '건너뛰기'}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
