"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import CompletionScreen from "@/components/onboarding/CompletionScreen";
import TermsAgreement from "@/components/onboarding/TermsAgreement";
import UserInfoForm from "@/components/onboarding/UserInfoForm";
import PublicPathHeader from "@/components/PublicPathHeader";
import { sendGTMEvent } from "@next/third-parties/google";

const today = new Date();

export default function OnboardingPage() {
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(
    `${today.getFullYear() - 24}년`,
  );
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 전체 동의 체크박스 핸들러
  const handleAllAgreement = () => {
    const newAllState = !agreements.all;
    setAgreements({
      all: newAllState,
      terms: newAllState,
      privacy: newAllState,
    });
  };

  // 개별 체크박스 핸들러
  const handleIndividualAgreement = (type: "terms" | "privacy") => {
    const newAgreements = {
      ...agreements,
      [type]: !agreements[type],
    };

    // 개별 체크박스 상태에 따라 전체 동의 상태 업데이트
    newAgreements.all = newAgreements.terms && newAgreements.privacy;

    setAgreements(newAgreements);
  };

  // 시작하기 버튼 활성화 조건
  const isStartButtonEnabled = agreements.terms && agreements.privacy;

  const handleStart = () => {
    if (isStartButtonEnabled) {
      // 다음 화면으로 상태 변경
      setShowNextScreen(true);
    }
  };

  const handleComplete = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 성별을 API 형식으로 변환
      const genderMap: { [key: string]: string } = {
        male: "m",
        female: "f",
        other: "etc",
      };

      // 연도에서 숫자만 추출하여 나이 계산
      const birthYear = parseInt(selectedYear.replace("년", ""));
      const age = today.getFullYear() - birthYear;

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          gender: genderMap[selectedGender] || "etc",
          nickname: "사용자", // 기본 닉네임 (추후 수정 가능)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원가입에 실패했습니다.");
      }

      // 성공 시 최종 화면으로 이동 (토큰은 API에서 자동 저장됨)
      setShowFinalScreen(true);
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    sendGTMEvent({
      event: "click.skip_signAddtional",
    });
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // 빈 객체로 전송 (건너뛰기)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원가입에 실패했습니다.");
      }

      // 성공 시 최종 화면으로 이동 (토큰은 API에서 자동 저장됨)
      setShowFinalScreen(true);
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 최종 완료 화면
  if (showFinalScreen) {
    return (
      <div className="min-h-screen bg-white">
        <PublicPathHeader />
        <CompletionScreen onGoHome={() => router.push("/")} />
      </div>
    );
  }

  // 성별/연령 입력 화면
  if (showNextScreen) {
    return (
      <div className="min-h-screen bg-white">
        <PublicPathHeader />
        <UserInfoForm
          selectedGender={selectedGender}
          selectedYear={selectedYear}
          isLoading={isLoading}
          onGenderSelect={setSelectedGender}
          onYearSelect={setSelectedYear}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      </div>
    );
  }

  // 약관 동의 화면 (기본 화면)
  return (
    <div className="min-h-screen bg-white">
      <PublicPathHeader />
      <TermsAgreement
        agreements={agreements}
        onAllAgreement={handleAllAgreement}
        onIndividualAgreement={handleIndividualAgreement}
        onStart={handleStart}
        isStartButtonEnabled={isStartButtonEnabled}
      />
    </div>
  );
}
