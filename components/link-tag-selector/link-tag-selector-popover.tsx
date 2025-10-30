'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';

import Checkbox from '@/components/checkbox';
import ResetButton from '@/components/reset-button';

import { clsx } from '@/utils/clsx';

import { ChevronDownIcon } from '@/assets/icons';

import TagSelectorSelectedTags from './link-tag-selector-selected-tags';

interface Props {
  className?: string;
  selected: string[];
  dataTestId?: string;
  setTags: (tags: string[]) => void;
  totalTags: string[];
}

export default function LinkTagSelectorDropdown({ selected, className, dataTestId, setTags, totalTags }: Props) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckTag = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetTag = e.target.value;
      if (selected.length && selected.includes(targetTag)) {
        setTags(selected.filter((tag) => tag !== targetTag));
      } else {
        setTags([...selected, targetTag]);
      }
    },
    [selected, setTags],
  );

  const handleReset = useCallback(() => {
    setTags([]);
  }, [setTags]);

  useEffect(() => {
    const maxWidth = tagsRef.current?.clientWidth;

    if (maxWidth) {
      if (previewRef.current) {
        document.body.removeChild(previewRef.current);
      }

      const preview = document.createElement('div');
      previewRef.current = preview;

      preview.style.display = 'flex';
      preview.style.gap = '0.25rem';
      preview.style.visibility = 'hidden';
      preview.style.position = 'fixed';
      preview.style.top = '-9999px';
      preview.style.left = '-9999px';
      preview.style.pointerEvents = 'none';
      preview.style.zIndex = '-1';
      document.body.appendChild(preview);

      let newTags = [...selected];
      for (const tag of selected) {
        const span = document.createElement('span');
        span.textContent = `#${tag}`;
        preview.appendChild(span);

        if (maxWidth < preview.clientWidth) {
          const index = selected.findIndex((_tag) => _tag === tag);
          newTags = selected.slice(0, index);
          break;
        }
      }

      setVisibleTags(newTags);
    }

    return () => {
      if (previewRef.current && document.body.contains(previewRef.current)) {
        document.body.removeChild(previewRef.current);
        previewRef.current = null;
      }
    };
  }, [selected]);

  useEffect(() => {
    setHiddenCount(selected.length - visibleTags.length);
  }, [selected.length, visibleTags.length]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          data-testid={dataTestId}
          type="button"
          className={clsx(
            'flex h-11.5 w-full items-center justify-between gap-0.5 rounded-lg border border-gray-500 px-3',
            className && className,
          )}
        >
          <div className="flex flex-1 items-center justify-between">
            <div ref={tagsRef} className="flex w-10/12 items-center gap-1">
              {visibleTags.length ? (
                visibleTags.map((tag) => (
                  <span key={`selected-tag-${tag}}`} className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-16-24 font-normal tracking-[-0.2px] text-gray-700">태그 전체</span>
              )}
            </div>
            {hiddenCount ? (
              <span className="mr-2 text-14-22 font-normal tracking-[-0.2px] text-gray-700">+{hiddenCount}개</span>
            ) : undefined}
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className={clsx('size-5 text-gray-500 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="flex max-w-min flex-col gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-2-16-19-0"
          sideOffset={4}
        >
          <div className="flex flex-col gap-5">
            <TagSelectorSelectedTags setTags={setTags} tags={selected} />
            <ul className="mini-scroll flex h-55.5 w-64.5 flex-col gap-2.5 overflow-auto border border-gray-200 p-3">
              {totalTags.map((tag, index) => (
                <li key={`total-tag-${index}`}>
                  <label
                    className="flex items-center gap-2 text-14-22 font-normal tracking-[-0.2px] text-black"
                    htmlFor={`tag-${tag}`}
                  >
                    <Checkbox
                      checked={selected.includes(tag)}
                      id={`tag-${tag}`}
                      value={tag}
                      onChange={handleCheckTag}
                    />
                    {tag}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <ResetButton onClick={handleReset} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
