'use client';

import { usePathname, useRouter } from 'next/navigation';

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useSearchBarStore, useSearchLinkFilterStore, useSearchLinkSortStore } from '@/libs/zustand/store';

import { CloseFillIcon, SearchIcon } from '@/assets/icons';

interface Props {
  inputDelay?: number;
}

export default function SearchInput({ inputDelay = 1000 }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { title, setTitle } = useSearchBarStore();
  const { setField } = useSearchLinkSortStore();
  const { resetFolderId, setFolderId } = useSearchLinkFilterStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState(title);

  const handleChangeSearchState = useCallback(
    (value: string) => {
      setTitle(value);
      router.push('/search');
      setField('relevance');
    },
    [setTitle, setField, router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleChangeSearchState(e.currentTarget.value);
      }
    },
    [handleChangeSearchState],
  );

  useEffect(() => {
    if (inputValue.length === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      handleChangeSearchState(inputValue);
    }, inputDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputValue, inputDelay, handleChangeSearchState]);

  useEffect(() => {
    if (pathname !== '/search') {
      setInputValue('');
      setTitle('');
      resetFolderId();
      setFolderId('all');
    }
  }, [pathname, resetFolderId, setInputValue, setFolderId, setTitle]);

  return (
    <div className="relative inline-block w-full max-w-90 lg:max-w-135 pc:max-w-180">
      <input
        className="h-12 w-full rounded-lg border pl-3 pr-20 focus:bg-primary-100"
        placeholder="링크 제목으로 검색해보세요."
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center gap-2 p-2">
        {inputValue && (
          <button type="button" onClick={() => setInputValue('')}>
            <CloseFillIcon aria-hidden="true" className="size-5 text-gray-500" />
          </button>
        )}
        <button type="button" onClick={() => handleChangeSearchState(inputValue)}>
          <SearchIcon aria-hidden="true" className="size-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
