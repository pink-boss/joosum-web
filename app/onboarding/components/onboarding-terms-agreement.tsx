'use client';

import { useCallback } from 'react';

import { clsx } from '@/utils/clsx';

import { CheckboxCircleIcon } from '@/assets/icons';

import AgreementCheckbox from './onboarding-agreement-checkbox';

interface Props {
  agreements: {
    all: boolean;
    privacy: boolean;
    terms: boolean;
  };
  onAllAgreement: () => void;
  onIndividualAgreement: (type: 'privacy' | 'terms') => void;
  onStart: () => void;
  isStartButtonEnabled: boolean;
}

export default function OnboardingTermsAgreement(props: Props) {
  const { agreements, onAllAgreement, onIndividualAgreement, onStart, isStartButtonEnabled } = props;

  const handleCheckTerms = useCallback(() => {
    onIndividualAgreement('terms');
  }, [onIndividualAgreement]);

  const handleCheckPrivacy = useCallback(() => {
    onIndividualAgreement('privacy');
  }, [onIndividualAgreement]);

  return (
    <main
      className="mx-auto flex size-full max-w-320 flex-col justify-center gap-8 px-20"
      data-testid="agreeTermsOfService"
    >
      <div className="text-center">
        <h1 className="mb-4 text-24-32 font-bold text-black">
          서비스 이용을 위한
          <br />
          이용약관 동의
        </h1>
        <span className="text-16-19 font-normal text-gray-800">
          서비스 이용을 위해 약관 및 정보제공에 동의해주세요.
        </span>
      </div>
      <div className="flex flex-col items-center" data-testid="agreeTermsOfService">
        <div className="w-83.75">
          <div className="mb-6">
            <button
              className="flex h-12 w-full items-center rounded-lg bg-gray-200 px-4"
              data-testid="checkAll_agreeTermsOfService"
              type="button"
              onClick={onAllAgreement}
            >
              <div className="flex items-center gap-2">
                <CheckboxCircleIcon
                  aria-hidden="true"
                  className={clsx('size-6', agreements.all ? 'text-primary-500' : 'text-white')}
                />
                <span className="text-16-19 font-bold text-gray-900">전체 동의</span>
              </div>
            </button>
          </div>
          <div className="mb-9 space-y-4 pl-4">
            <AgreementCheckbox
              dataTestId="checkTermsOfService_agreeTermsOfService"
              isChecked={agreements.terms}
              label="서비스 이용약관 동의"
              link="https://joosum.notion.site/6df241a6e3174b8fbfc7933a506a0b1e"
              linkDataTestId="termsOfService_agreeTermsOfService"
              onCheck={handleCheckTerms}
            />
            <AgreementCheckbox
              dataTestId="checkPrivacyPolicy_agreeTermsOfService"
              isChecked={agreements.privacy}
              label="개인정보 수집 및 이용 동의"
              link="https://joosum.notion.site/33975a64eb55468ea523f707353743cf"
              linkDataTestId="privacyPolicy_agreeTermsOfService"
              onCheck={handleCheckPrivacy}
            />
          </div>
          <button
            className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            data-testid="signUp_agreeTermsOfService"
            disabled={!isStartButtonEnabled}
            onClick={onStart}
          >
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-inherit">동의하고 시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
