import { useCallback } from 'react';

import { FolderLinkFilterState } from '@/libs/zustand/store';
import { removeItem } from '@/utils/array';

import { CloseFillIcon } from '@/assets/icons';

interface Props extends Pick<FolderLinkFilterState, 'setTags' | 'tags'> {}

export default function LinkTagSelectorSelectedTags({ tags, setTags }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">선택된 태그</span>
        <span className="text-xs text-gray-500">{tags.length}/10</span>
      </div>
      <TagBadge setTags={setTags} tags={tags} />
    </>
  );
}

function TagBadge({ tags, setTags }: { setTags: (tags: string[]) => void; tags: string[] }) {
  const handleRemoveTag = useCallback(
    (targetTag: string) => {
      setTags(removeItem(tags, targetTag));
    },
    [setTags, tags],
  );

  return tags.length ? (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div key={`selected-tag-${tag}`} className="flex items-center gap-1 rounded-12.5 bg-gray-300 px-2 py-1">
          <span className="text-xs font-normal leading-5 tracking-[-0.2px] text-black">{tag}</span>
          <button className="flex-none" type="button" onClick={() => handleRemoveTag(tag)}>
            <CloseFillIcon className="size-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="p-2 text-sm text-gray-500">태그를 선택 또는 생성 해주세요.</div>
  );
}
