import Image from 'next/image';

import clsx from 'clsx';

interface Props {
  unread: boolean;
}

export default function LinkEmpty({ unread }: Props) {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col items-center justify-center gap-[14.4px]',
        'text-center text-lg text-gray-dim',
      )}
    >
      {!unread ? (
        <>
          <Image priority alt="empty-links" height={141.6} src="/empty-links.svg" width={188.4} />
          <div>
            <p>저장된 링크가 없어요.</p>
            <p>링크를 주섬주섬 담아보세요.</p>
          </div>
        </>
      ) : (
        <>
          <Image priority alt="read-links" height={142.8} src="/read-links.png" width={139.2} />
          <div>
            <p>저장된 링크를 모두 다 읽었어요!</p>
          </div>
        </>
      )}
    </div>
  );
}
