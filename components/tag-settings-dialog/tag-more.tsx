'use client';

import { useCallback, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';

import { useUpsertTags } from '@/services/tag';

import { useSubDialogStore } from '@/libs/zustand/store';

import { MoreVerticalIcon } from '@/assets/icons';

import { Tag } from '@/types/tags.types';

interface Props {
  label: string;
}

export default function TagMore({ label }: Props) {
  const { openDeleteTagConfirm } = useSubDialogStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(() => {
    useSubDialogStore.setState({ key: label });
    openDeleteTagConfirm(true);
  }, [label, openDeleteTagConfirm]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="rounded-full" data-testid="kebab_settingTag_myPage" type="button">
          <MoreVerticalIcon aria-hidden="true" className="size-6 text-gray-500" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="flex w-40 flex-col gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-2-16-19-0"
          sideOffset={4}
          style={{ zIndex: 9999 }}
        >
          <TagUpdaterInput defaultValue={label} onSuccess={() => setIsOpen(false)} />
          <button className="w-full pl-1" type="button" onClick={handleDelete}>
            <span className="text-start text-16-24 font-semibold tracking-[-0.2px] text-gray-900">태그 삭제</span>
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function TagUpdaterInput({ defaultValue, onSuccess }: { defaultValue: Tag; onSuccess?: () => void }) {
  const { handleInput, inputRef, loading } = useUpsertTags({ onSuccess });

  return (
    <input
      autoFocus
      ref={inputRef}
      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-200 p-2.75 text-16-24 font-normal tracking-[-0.2px] text-gray-900 placeholder:text-gray-600 focus:border-primary-500 focus:bg-primary-100 focus:font-semibold focus:placeholder:font-normal focus:placeholder:text-gray-900"
      defaultValue={defaultValue}
      disabled={loading}
      onKeyUp={(e) => handleInput(e, defaultValue)}
    />
  );
}
