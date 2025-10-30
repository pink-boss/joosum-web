import Image from 'next/image';

interface Props {
  unread: boolean;
}

export default function LinkEmpty({ unread }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[14.4px]">
      {!unread ? (
        <>
          <Image priority alt="" height={141.6} src="/images/img-link.png" width={188.4} />
          <span className="text-center text-18-26 font-normal tracking-[-0.2px] text-gray-700">
            저장된 링크가 없어요.
            <br />
            링크를 주섬주섬 담아보세요.
          </span>
        </>
      ) : (
        <>
          <Image priority alt="" height={142.8} src="/images/img-read-links.png" width={139.2} />
          <span className="text-center text-18-26 font-normal tracking-[-0.2px] text-gray-700">
            저장된 링크를 모두 다 읽었어요!
          </span>
        </>
      )}
    </div>
  );
}
