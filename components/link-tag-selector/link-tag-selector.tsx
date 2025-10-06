'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import clsx from 'clsx';

import { useGetLinkFilterTags } from '@/services/tag';

import Checkbox from '@/components/checkbox';
import ResetButton from '@/components/reset-button';

import { useClickAway } from '@/hooks/utils';
import { FolderLinkFilterState } from '@/libs/zustand/store';
import { removeItem } from '@/utils/array';

import TagSelectorDropdown from './link-tag-selector-dropdown';
import TagSelectorSelectedTags from './link-tag-selector-selected-tags';

interface Props extends Pick<FolderLinkFilterState, 'setTags' | 'tags'> {
  className?: string;
  selectBoxClassName?: string;
  dataTestId?: string;
}

export default function LinkTagSelector({ className, selectBoxClassName, tags, setTags, dataTestId }: Props) {
  const { totalTags } = useGetLinkFilterTags();

  const ref = useClickAway({ onClose: () => setIsOpen(false) });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCheckTag = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetTag = e.target.value;
      if (tags.length && tags.includes(targetTag)) {
        setTags(removeItem(tags, targetTag));
      } else {
        setTags([...tags, targetTag]);
      }
    },
    [tags, setTags],
  );

  const handleReset = useCallback(() => {
    setTags([]);
  }, [setTags]);

  return (
    <div ref={ref} className={clsx('relative', className && className)}>
      {/* 태그 필터 */}
      <TagSelectorDropdown
        className={selectBoxClassName}
        dataTestId={dataTestId}
        isOpen={isOpen}
        selected={tags}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <div
          className={clsx(
            'absolute z-10 mt-1 flex max-w-min flex-col',
            'gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
          )}
        >
          <div className="flex flex-col gap-5">
            <TagSelectorSelectedTags setTags={setTags} tags={tags} />
            <ul className="mini-scroll flex h-55.5 w-64.5 flex-col gap-2.5 overflow-auto border border-gray-200 p-3">
              {totalTags.map((tag, index) => (
                <li key={`total-tag-${index}`} className="flex gap-2">
                  <Checkbox checked={tags.includes(tag)} id={`tag-${tag}`} value={tag} onChange={handleCheckTag} />
                  <label className="text-sm" htmlFor={`tag-${tag}`}>
                    {tag}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <ResetButton onClick={handleReset} />
          </div>
        </div>
      )}
    </div>
  );
}
