import Image from "next/image";

type InputProps = {
  unread: boolean;
};

/**
 * TODO: 디렉토리, 파일 네이밍 변경
 * 디렉토리 - kebab-case
 * 페이지, 레이아웃 - lower-case
 * 컴포넌트 - PascalCase
 * 유틸, 훅 - camelCase
 */
export default function EmptyLinks({ unread }: InputProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[14.4px] text-center">
      {!unread ? (
        <>
          <Image
            src="/empty-links.svg"
            alt="empty-links"
            width={188.4}
            height={141.6}
          />
          <div className="text-lg text-text-secondary">
            <p>저장된 링크가 없어요.</p>
            <p>링크를 주섬주섬 담아보세요.</p>
          </div>
        </>
      ) : (
        <>
          <Image
            src="/read-links.png"
            alt="read-links"
            width={139.2}
            height={142.8}
          />
          <div className="text-lg text-text-secondary">
            <p>저장된 링크를 모두 다 읽었어요!</p>
          </div>
        </>
      )}
    </div>
  );
}
