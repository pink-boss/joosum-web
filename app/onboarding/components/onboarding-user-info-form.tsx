'use client';

import { useCallback } from 'react';

import clsx from 'clsx';

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
    <main
      className="mx-auto flex size-full max-w-[1280px] flex-col justify-center gap-8 px-20"
      data-testid="signAdditional"
    >
      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold leading-8 text-black">
          만나서 반가워요!
          <br />
          성별과 연령을 입력해주세요
        </h1>
        <p className="text-base leading-[19px] text-gray-ink">
          입력한 성별/연령 정보는 주섬 앱 개선을 위해서만 <br />
          사용되며 다른 용도로 사용되지 않아요.
        </p>
      </div>
      {/* 입력 섹션 */}
      <div className="flex justify-center">
        <div className="w-[335px]">
          {/* 성별 선택 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-black">성별을 선택해주세요</h2>
            <div className="flex gap-2">
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('male')}
                className={clsx(
                  'flex h-12 w-[104px] items-center justify-center rounded-lg font-semibold',
                  selectedGender === 'male' ? 'bg-primary-500 text-white' : 'bg-gray-vapor text-gray-dim',
                )}
              >
                남자
              </button>
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('female')}
                className={clsx(
                  'flex h-12 w-[104px] items-center justify-center rounded-lg font-semibold',
                  selectedGender === 'female' ? 'bg-primary-500 text-white' : 'bg-gray-vapor text-gray-dim',
                )}
              >
                여자
              </button>
              <button
                data-testid="selectGender_signAdditional"
                type="button"
                onClick={() => handleGenderSelect('other')}
                className={clsx(
                  'flex h-12 w-[104px] items-center justify-center rounded-lg font-semibold',
                  selectedGender === 'other' ? 'bg-primary-500 text-white' : 'bg-gray-vapor text-gray-dim',
                )}
              >
                기타
              </button>
            </div>
          </section>
          {/* 출생연도 선택 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-black">출생연도를 선택해주세요</h2>
            <div className="relative">
              <select
                className="h-12 w-full appearance-none rounded-lg bg-gray-ghost px-3 font-semibold text-gray-black focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <ChevronDownIcon className="size-6 text-gray-500" />
              </div>
            </div>
          </section>
          {/* 완료 버튼 */}
          <button
            disabled={isLoading}
            type="button"
            onClick={onComplete}
            className={clsx(
              'mb-4 flex h-14 w-full items-center justify-center gap-2 rounded-lg text-lg font-semibold',
              isLoading
                ? 'cursor-not-allowed bg-gray-400 text-gray-200'
                : 'bg-primary-500 text-white hover:bg-primary-600',
            )}
          >
            {isLoading ? (
              <>
                <div className="size-5 animate-spin rounded-full border-2 border-gray-200 border-t-white"></div>
                <span>처리중...</span>
              </>
            ) : (
              <>
                <span>완료</span>
              </>
            )}
          </button>
          {/* 건너뛰기 */}
          <div className="text-center">
            <button
              data-testid="skip_signAdditional"
              disabled={isLoading}
              type="button"
              onClick={onSkip}
              className={clsx(
                'text-base',
                isLoading ? 'cursor-not-allowed text-gray-400' : 'text-gray-ink hover:text-gray-black',
              )}
            >
              {isLoading ? '처리중...' : '건너뛰기'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
