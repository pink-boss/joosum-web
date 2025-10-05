import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { useSearchBarStore, useSearchLinkFilterStore, useSearchLinkSortStore } from '@/libs/zustand/store';

interface Props {
  inputDelay?: number;
}

export default function SearchInput({ inputDelay = 1000 }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { title, setTitle } = useSearchBarStore();
  const { setField } = useSearchLinkSortStore();
  const { resetFolderId } = useSearchLinkFilterStore();

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
    }
  }, [pathname, resetFolderId, setInputValue, setTitle]);

  return (
    <div className={clsx('relative inline-block w-full', 'max-w-[360px] lg:max-w-[540px] pc:max-w-[720px]')}>
      <input
        className={clsx('h-[48px] w-full rounded-lg border pl-3 pr-20', 'focus:bg-primary-100')}
        placeholder="링크 제목으로 검색해보세요."
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={clsx('absolute right-3 top-1/2 -translate-y-1/2', 'flex items-center justify-center gap-2 p-2')}>
        {inputValue && (
          <button
            type="button"
            onClick={() => setInputValue('')}
            className={clsx(
              'size-5 rounded-full',
              'bg-gray-silver text-lg text-white',
              'flex items-center justify-center',
            )}
          >
            &times;
          </button>
        )}
        <button className="cursor-pointer" type="button" onClick={() => handleChangeSearchState(inputValue)}>
          <Image alt="search" height={22} src="/icons/icon-search.png" width={22} />
        </button>
      </div>
    </div>
  );
}
