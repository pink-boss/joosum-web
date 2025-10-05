'use client';

import Image from 'next/image';

import { useCallback } from 'react';

import { useSelectFolder } from '@/services/folder';

import { useDialogStore } from '@/libs/zustand/store';

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
      <Image alt="plus" height={24} src="/icons/icon-plus-white.png" width={24} />
      폴더 추가
    </button>
  );
}
