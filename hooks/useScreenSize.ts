import { useLayoutEffect, useState, useReducer } from "react";

export function useScreenSize() {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(true);
  const [screenWidth, setScreenWidth] = useState(1024);
  const [isLoading, setIsLoading] = useState(true);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsTabletOrLarger = width >= 822;

      // 상태 업데이트
      setScreenWidth(width);
      setIsTabletOrLarger(newIsTabletOrLarger);
      setIsLoading(false);

      // 강제 리렌더링
      forceUpdate();
    };

    // 초기 체크
    checkScreenSize();

    // resize 이벤트 리스너
    const handleResize = () => {
      // 약간의 지연을 두고 체크 (브라우저 렌더링 완료 대기)
      requestAnimationFrame(() => {
        checkScreenSize();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 의존성 배열을 비워서 무한 루프 방지

  return { isTabletOrLarger, screenWidth, isLoading };
}
