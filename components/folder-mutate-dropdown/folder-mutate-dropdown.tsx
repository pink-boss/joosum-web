import { useCallback } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useSelectFolder } from '@/services/folder';

import { useDialogStore } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';

import { MoreVerticalIcon } from '@/assets/icons';

import { Folder } from '@/types/folder.types';

interface Props {
  isLayout?: boolean;
  folder: Folder;
  dataTestId?: string;
  type: 'menu' | 'myFolder';
}

// 폴더 수정/삭제 드롭다운
export default function FolderMutateDropdown({ folder, type, isLayout = false, dataTestId }: Props) {
  const { openMutateFolder, openDeleteFolder } = useDialogStore();
  useSelectFolder({ _title: folder.title });

  const handleCloseDialog = useCallback(() => {
    openMutateFolder(false);
    openDeleteFolder(false);
  }, [openMutateFolder, openDeleteFolder]);

  const handleModify = useCallback(() => {
    handleCloseDialog();
    openMutateFolder(true, folder.title);
  }, [handleCloseDialog, openMutateFolder, folder.title]);

  const handleDelete = useCallback(() => {
    handleCloseDialog();
    openDeleteFolder(true, folder.title);
  }, [handleCloseDialog, openDeleteFolder, folder.title]);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            data-testid={dataTestId}
            type="button"
            className={clsx(
              'flex items-center justify-center rounded-full',
              isLayout ? 'ml-auto size-5' : 'size-12 bg-white/80',
            )}
          >
            <MoreVerticalIcon
              aria-hidden="true"
              className={clsx('size-6.5 text-black', isLayout && 'size-6 text-gray-500')}
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            className="flex w-27.5 flex-col rounded-lg border border-gray-200 bg-white py-4 shadow-2-16-19-0"
            sideOffset={4}
          >
            <DropdownItem dataTestId={`edit_setting_${type}`} title="폴더 수정" onClick={handleModify} />
            <DropdownItem dataTestId={`delete_setting_${type}`} title="폴더 삭제" onClick={handleDelete} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

const DropdownItem = ({ title, onClick, dataTestId }: { dataTestId?: string; onClick: () => void; title: string }) => {
  return (
    <DropdownMenu.Item
      className="w-full px-5 py-1 text-center font-semibold text-gray-900"
      data-testid={dataTestId}
      onSelect={onClick}
    >
      {title}
    </DropdownMenu.Item>
  );
};
