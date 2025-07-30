import Image from "next/image";

interface LoadMoreButtonProps {
  /** 더 보기 버튼 클릭 핸들러 */
  onClick: () => void;
  /** 남은 아이템 개수 */
  remainingCount: number;
  /** 버튼 텍스트 접두사 (예: "저장한", "읽지 않은", "링크") */
  textPrefix?: string;
  /** 버튼 텍스트 접미사 (예: "개 더 보기", "개 모두 보기") */
  textSuffix?: string;
  /** 아이콘 이미지 경로 */
  iconSrc?: string;
  /** 아이콘 alt 텍스트 */
  iconAlt?: string;
  /** 버튼 스타일 변형 */
  variant?: "card" | "list";
  /** 커스텀 클래스명 */
  className?: string;
}

export default function LoadMoreButton({
  onClick,
  remainingCount,
  textPrefix = "",
  textSuffix = "개 더 보기",
  iconSrc = "/icons/icon-right.png",
  iconAlt = "더 보기",
  variant = "card",
  className = "",
}: LoadMoreButtonProps) {
  const displayCount = remainingCount > 999 ? "999+" : remainingCount;

  const baseClassName = "flex cursor-pointer";

  const variantClassNames = {
    card: "self-center rounded-lg py-4",
    list: "justify-center p-4",
  };

  const contentVariantClassNames = {
    card: "",
    list: "items-center gap-1 rounded-lg px-4 py-2 hover:bg-gray-100",
  };

  return (
    <div
      className={`${baseClassName} ${variantClassNames[variant]} ${className}`}
    >
      <div
        className={`flex ${contentVariantClassNames[variant]}`}
        onClick={onClick}
      >
        <span className="text-lg font-bold text-gray-dim">
          {textPrefix && `${textPrefix} `}
          링크 {displayCount}
          {textSuffix}
        </span>
        <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
      </div>
    </div>
  );
}
