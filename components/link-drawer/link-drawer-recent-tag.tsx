import { RefObject } from 'react';

interface Props {
  handleSelectRecentTag: (tag: string) => void;
  recentTagsRef: RefObject<HTMLDivElement>;
  totalTags: string[];
  top: number;
}

export default function LinkDrawerRecentTag({ totalTags, handleSelectRecentTag, recentTagsRef, top }: Props) {
  return (
    <div
      ref={recentTagsRef}
      className="mini-scroll absolute right-0 max-h-64 w-full overflow-y-auto rounded-lg border bg-white px-6 pb-6"
      style={{ top: `${top}px` }}
    >
      <span className="sticky inset-x-0 top-0 z-1 bg-white pb-5 pt-6 text-16-24 font-bold tracking-[-0.2px] text-gray-900">
        최근 사용한 태그
      </span>
      {totalTags.length > 0 ? (
        <div className="flex flex-col gap-2">
          {totalTags.map((tag) => (
            <button
              key={`recent-tag-${tag}`}
              className="w-full"
              data-testid="recent_tag"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSelectRecentTag(tag);
              }}
            >
              <span className="w-full text-left text-16-24 font-normal tracking-[-0.2px] text-black">{tag}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center pb-5">
          <span className="text-16-24 font-normal tracking-[-0.2px] text-gray-700">최근 사용한 태그가 없어요</span>
        </div>
      )}
    </div>
  );
}
