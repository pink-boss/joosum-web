import Image from 'next/image';

import { useCallback } from 'react';

import { useSelectFolder } from '@/services/folder';

import FolderDropdown from '@/components/folder-dropdown';

import { useDialogStore } from '@/libs/zustand/store';

import { Folder } from '@/types/folder.types';

interface Props {
  dataTestId?: string;
  disabled?: boolean;
  folderId?: Folder['linkBookId'];
  setFolderId: (folderName: Folder['title'], folderId: Folder['linkBookId']) => void;
}

// Drawer 내부에서 폴더 관련 섹션 (새폴더 및 폴더 변경)
export default function LinkDrawerFolder({ folderId, setFolderId, disabled, dataTestId }: Props) {
  const { openMutateFolder } = useDialogStore();

  const { clearFolder } = useSelectFolder({});

  const handleClick = useCallback(() => {
    clearFolder();
    openMutateFolder(true, undefined, dataTestId);
  }, [clearFolder, openMutateFolder, dataTestId]);

  return (
    <div className="flex flex-col gap-2 text-gray-black">
      <div className="flex justify-between px-2">
        <label className="text-lg font-semibold">폴더</label>
        <button
          className="flex items-center font-semibold text-primary-500"
          data-testid={dataTestId}
          disabled={disabled}
          type="button"
          onClick={handleClick}
        >
          <Image alt="new-folder" height={24} src="/icons/icon-plus.png" width={24} />
          새폴더
        </button>
      </div>
      <FolderDropdown
        className="border-none bg-gray-ghost"
        disabled={disabled}
        folderId={folderId}
        setFolderId={setFolderId}
      />
    </div>
  );
}
