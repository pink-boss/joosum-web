'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { useUpsertTags } from '@/services/tag';

import { useClickAway } from '@/hooks/utils';
import { useSubDialogStore } from '@/libs/zustand/store';

import { MoreVerticalIcon } from '@/assets/icons';

import { Tag } from '@/types/tags.types';

interface Props {
  label: string;
}

export default function TagMore({ label }: Props) {
  const ref = useClickAway({ onClose: () => setIsOpen(false) });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { openDeleteTagConfirm } = useSubDialogStore();

  const handleDelete = useCallback(() => {
    useSubDialogStore.setState({ key: label });
    openDeleteTagConfirm(true);
  }, [label, openDeleteTagConfirm]);

  const handleClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen]);

  return (
    <div ref={ref} className={clsx('relative')}>
      <button className="rounded-full" data-testid="kebab_settingTag_myPage" type="button" onClick={handleClick}>
        <MoreVerticalIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            'fixed right-16 z-10 mt-1 flex w-40 flex-col',
            'gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
          )}
        >
          <TagUpdaterInput defaultValue={label} onSuccess={() => setIsOpen(false)} />
          <button className="w-full pl-1 text-start font-semibold text-gray-900" type="button" onClick={handleDelete}>
            태그 삭제
          </button>
        </div>
      )}
    </div>
  );
}

function TagUpdaterInput({ defaultValue, onSuccess }: { defaultValue: Tag; onSuccess?: () => void }) {
  const { handleInput, inputRef, loading } = useUpsertTags({ onSuccess });

  return (
    <input
      autoFocus
      ref={inputRef}
      className="w-full bg-gray-200 px-2 py-2.25 text-gray-700"
      defaultValue={defaultValue}
      disabled={loading}
      onKeyUp={(e) => handleInput(e, defaultValue)}
    />
  );
}
