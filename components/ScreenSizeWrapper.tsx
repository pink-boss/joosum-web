import { ReactNode, useEffect, useReducer } from "react";

import Loading from "@/components/Loading";
import MobileRestriction from "@/components/MobileRestriction";
import { useScreenSize } from "@/hooks/useScreenSize";

interface ScreenSizeWrapperProps {
  children: ReactNode;
}

export default function ScreenSizeWrapper({
  children,
}: ScreenSizeWrapperProps) {
  const { isTabletOrLarger, screenWidth, isLoading } = useScreenSize();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // 상태 변화 추적 및 강제 리렌더링
  useEffect(() => {
    if (!isLoading) {
      // 강제 리렌더링
      forceUpdate();
    }
  }, [isTabletOrLarger, screenWidth, isLoading]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  // 화면 크기가 822px 미만일 때 제한 화면 표시
  if (!isTabletOrLarger) {
    return <MobileRestriction />;
  }

  // 822px 이상일 때 정상 컨텐츠 표시

  return children;
}
