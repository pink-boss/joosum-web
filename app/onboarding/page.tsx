'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useMemo, useState } from 'react';

import PublicPathHeader from '@/components/public-path-header';

import { OnboardingComplete, OnboardingTermsAgreement, OnboardingUserInfoForm } from './components';

const TODAY = new Date();

// 약관 동의 -> 성별 입력 -> 완료 화면
export default function OnboardingPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedYear, setSelectedYear] = useState(`${TODAY.getFullYear() - 24}년`);
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  // 시작하기 버튼 활성화 조건
  const isStartButtonEnabled = useMemo(() => agreements.terms && agreements.privacy, [agreements]);

  // 전체 동의 체크박스 핸들러
  const handleAllAgreement = useCallback(() => {
    const newAllState = !agreements.all;
    setAgreements({
      all: newAllState,
      terms: newAllState,
      privacy: newAllState,
    });
  }, [agreements]);

  // 개별 체크박스 핸들러
  const handleIndividualAgreement = useCallback(
    (type: 'privacy' | 'terms') => {
      const newAgreements = {
        ...agreements,
        [type]: !agreements[type],
      };

      // 개별 체크박스 상태에 따라 전체 동의 상태 업데이트
      newAgreements.all = newAgreements.terms && newAgreements.privacy;

      setAgreements(newAgreements);
    },
    [agreements],
  );

  const handleStart = useCallback(() => {
    if (isStartButtonEnabled) {
      // 다음 화면으로 상태 변경
      setShowNextScreen(true);
    }
  }, [isStartButtonEnabled]);

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 성별을 API 형식으로 변환
      const genderMap: { [key: string]: string } = {
        male: 'm',
        female: 'f',
        other: 'etc',
      };

      // 연도에서 숫자만 추출하여 나이 계산
      const birthYear = parseInt(selectedYear.replace('년', ''));
      const age = TODAY.getFullYear() - birthYear;

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age,
          gender: genderMap[selectedGender] || 'etc',
          nickname: '사용자', // 기본 닉네임 (추후 수정 가능)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '회원가입에 실패했습니다.');
      }

      // 성공 시 최종 화면으로 이동 (토큰은 API에서 자동 저장됨)
      setShowFinalScreen(true);
    } catch (error) {
      console.error('Signup error:', error);
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, selectedGender, selectedYear]);

  const handleSkip = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 빈 객체로 전송 (건너뛰기)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '회원가입에 실패했습니다.');
      }

      // 성공 시 최종 화면으로 이동 (토큰은 API에서 자동 저장됨)
      setShowFinalScreen(true);
    } catch (error) {
      console.error('Signup error:', error);
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // 최종 완료 화면
  if (showFinalScreen) {
    return (
      <div className="min-h-screen bg-white">
        <PublicPathHeader />
        <OnboardingComplete onGoHome={() => router.push('/')} />
      </div>
    );
  }

  // 성별/연령 입력 화면
  if (showNextScreen) {
    return (
      <div className="min-h-screen bg-white">
        <PublicPathHeader />
        <OnboardingUserInfoForm
          isLoading={isLoading}
          selectedGender={selectedGender}
          selectedYear={selectedYear}
          onComplete={handleSubmit}
          onGenderSelect={setSelectedGender}
          onSkip={handleSkip}
          onYearSelect={setSelectedYear}
        />
      </div>
    );
  }

  // 약관 동의 화면 (기본 화면)
  return (
    <div className="min-h-screen bg-white">
      <PublicPathHeader />
      <OnboardingTermsAgreement
        agreements={agreements}
        isStartButtonEnabled={isStartButtonEnabled}
        onAllAgreement={handleAllAgreement}
        onIndividualAgreement={handleIndividualAgreement}
        onStart={handleStart}
      />
    </div>
  );
}
