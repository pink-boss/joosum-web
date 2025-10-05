import { RefObject } from 'react';

import clsx from 'clsx';

interface Props {
  handleSelectRecentTag: (tag: string) => void;
  recentTagsRef: RefObject<HTMLDivElement>;
  totalTags: string[];
}

export default function LinkDrawerRecentTag({ totalTags, handleSelectRecentTag, recentTagsRef }: Props) {
  return (
    <div
      ref={recentTagsRef}
      className={clsx(
        'absolute right-0 top-full max-h-64 w-full overflow-y-auto',
        'rounded-lg border bg-white',
        'pl-[10px] pt-[10px]',
      )}
    >
      <h3 className="my-2 font-semibold">최근 사용한 태그</h3>
      {totalTags.map((tag) => (
        <div
          key={`recent-tag-${tag}`}
          data-testid="recent_tag"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSelectRecentTag(tag);
          }}
          className={clsx(
            'flex justify-between',
            'border-b border-gray-vapor py-3 pl-[10px] last:border-b-0',
            'cursor-pointer hover:bg-gray-ghost',
          )}
        >
          <div className="text-gray-dim">{tag}</div>
        </div>
      ))}
    </div>
  );
}
