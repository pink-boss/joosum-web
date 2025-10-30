'use client';

import { useCallback } from 'react';

import { useSelectFolder } from '@/services/folder';

import { useDialogStore } from '@/libs/zustand/store';

import { PlusIcon } from '@/assets/icons';

// 내 폴더 화면에서 + 폴더 추가 버튼
export default function MyFolderCreateButton() {
  const { openMutateFolder } = useDialogStore();

  const { clearFolder } = useSelectFolder({});

  const handleClick = useCallback(() => {
    clearFolder();
    openMutateFolder(true, undefined, 'addFolder');
  }, [clearFolder, openMutateFolder]);

  return (
    <button
      className="flex rounded bg-primary-500 py-1.5 pl-2 pr-3 transition-colors hover:bg-primary-600"
      data-testid="addFolder_myFolder"
      type="button"
      onClick={handleClick}
    >
      <PlusIcon aria-hidden="true" className="text-gray-500" height={24} width={24} />
      <span className="text-16-24 font-semibold tracking-[-0.2px] text-white">폴더 추가</span>
    </button>
  );
}
