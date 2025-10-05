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
      className="flex rounded bg-primary-500 py-[6px] pl-2 pr-3 font-semibold text-white"
      data-testid="addFolder_myFolder"
      type="button"
      onClick={handleClick}
    >
      <PlusIcon aria-hidden="true" className="text-gray-500" height={24} width={24} />
      폴더 추가
    </button>
  );
}
