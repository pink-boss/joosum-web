import { useCallback } from 'react';

import { useSelectFolder } from '@/services/folder';

import FolderDropdown from '@/components/folder-dropdown';

import { useDialogStore } from '@/libs/zustand/store';

import { PlusIcon } from '@/assets/icons';

import { Folder } from '@/types/folder.types';

interface Props {
  buttonDataTestId?: string;
  disabled?: boolean;
  dropdownDataTestId?: string;
  folderId?: Folder['linkBookId'];
  setFolderId: (folderName: Folder['title'], folderId: Folder['linkBookId']) => void;
}

// Drawer 내부에서 폴더 관련 섹션 (새폴더 및 폴더 변경)
export default function LinkDrawerFolder({
  folderId,
  setFolderId,
  disabled,
  buttonDataTestId,
  dropdownDataTestId,
}: Props) {
  const { openMutateFolder } = useDialogStore();

  const { clearFolder } = useSelectFolder({});

  const handleClick = useCallback(() => {
    clearFolder();
    openMutateFolder(true, undefined, buttonDataTestId);
  }, [clearFolder, openMutateFolder, buttonDataTestId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="px-1 text-18-26 font-semibold tracking-[-0.2px] text-black">폴더</label>
        <button
          className="flex items-center"
          data-testid={buttonDataTestId}
          disabled={disabled}
          type="button"
          onClick={handleClick}
        >
          <PlusIcon aria-hidden="true" className="size-6 text-gray-500" />
          <span className="text-16-24 font-semibold tracking-[-0.2px] text-primary-500">새폴더</span>
        </button>
      </div>
      <FolderDropdown
        dataTestId={dropdownDataTestId}
        disabled={disabled}
        folderId={folderId}
        setFolderId={setFolderId}
      />
    </div>
  );
}
