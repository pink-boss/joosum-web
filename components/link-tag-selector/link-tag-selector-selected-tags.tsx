import clsx from 'clsx';

import { FolderLinkFilterState } from '@/libs/zustand/store';
import { removeItem } from '@/utils/array';

interface Props extends Pick<FolderLinkFilterState, 'setTags' | 'tags'> {}

export default function LinkTagSelectorSelectedTags({ tags, setTags }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-black">선택된 태그</span>
        <span className="text-xs text-gray-silver">{tags.length}/10</span>
      </div>
      <TagBadge setTags={setTags} tags={tags} />
    </>
  );
}

function TagBadge({ tags, setTags }: { setTags: (tags: string[]) => void; tags: string[] }) {
  const handleRemoveTag = (targetTag: string) => {
    setTags(removeItem(tags, targetTag));
  };

  return tags.length ? (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div key={`selected-tag-${tag}`} className="flex items-center gap-1 rounded-[50px] bg-gray-vapor px-2 py-1">
          <span>{tag}</span>
          <button
            onClick={() => handleRemoveTag(tag)}
            className={clsx(
              'flex size-4 items-center justify-center',
              'rounded-full bg-gray-silver text-sm font-medium text-white',
            )}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="p-2 text-sm text-gray-silver">태그를 선택 또는 생성 해주세요.</div>
  );
}
