import { useCallback, useState } from 'react';

import clsx from 'clsx';

import { useSelectFolder } from '@/services/folder';

import { useClickAway } from '@/hooks/utils';
import { useDialogStore } from '@/libs/zustand/store';

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

  const ref = useClickAway({ onClose: () => setIsOpen(false) });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleCloseDialog = useCallback(() => {
    openMutateFolder(false);
    openDeleteFolder(false);
  }, [openMutateFolder, openDeleteFolder]);

  const handleModify = useCallback(() => {
    handleCloseDialog();
    openMutateFolder(true, folder.title);
    handleClose();
  }, [handleClose, handleCloseDialog, openMutateFolder, folder.title]);

  const handleDelete = useCallback(() => {
    handleCloseDialog();
    openDeleteFolder(true, folder.title);
    handleClose();
  }, [handleClose, handleCloseDialog, openDeleteFolder, folder.title]);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        data-testid={dataTestId}
        type="button"
        onClick={handleOpen}
        className={clsx(
          'flex items-center justify-center rounded-full',
          !isLayout && 'size-12 bg-white/80',
          isLayout && 'size-5',
        )}
      >
        <MoreVerticalIcon
          aria-hidden="true"
          className={clsx('size-6.5 text-black', isLayout && 'size-6 text-gray-500')}
        />
      </button>
      {isOpen && (
        <div className="fixed z-20 mt-1 flex w-27.5 flex-col rounded-lg border border-gray-200 bg-white py-4 shadow-xl">
          <DropdownItem dataTestId={`edit_setting_${type}`} title="폴더 수정" onClick={handleModify} />
          <DropdownItem dataTestId={`delete_setting_${type}`} title="폴더 삭제" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}

const DropdownItem = ({ title, onClick, dataTestId }: { dataTestId?: string; onClick: () => void; title: string }) => {
  return (
    <button
      className="w-full px-5 py-1 font-semibold text-gray-900"
      data-testid={dataTestId}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
