'use client';

import { useCallback } from 'react';

import { useDeleteFolder, useSelectFolder } from '@/services/folder';

import ConfirmDialog from '@/components/confirm-dialog';

import { useDialogStore } from '@/libs/zustand/store';

// 폴더 삭제 모달
export default function FolderDeleteDialog() {
  const { isDeleteFolderOpen: isOpen, openDeleteFolder: open, key } = useDialogStore();
  const { clearFolder, folder } = useSelectFolder({ _title: key });

  const handleClose = useCallback(() => {
    clearFolder();
    open(false);
  }, [clearFolder, open]);

  const mutation = useDeleteFolder({ onSuccess: handleClose });

  const handleSubmit = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return (
    <ConfirmDialog
      closeProps={{ children: '취소', onClick: handleClose }}
      open={isOpen}
      submitLoading={mutation.isPending}
      onCloseCallback={handleClose}
      submitProps={{
        children: '삭제',
        onClick: handleSubmit,
      }}
    >
      <div className="text-center text-gray-800">
        <p>폴더 내의 모든 링크가 삭제됩니다.</p>
        <p>
          <span className="text-lg font-bold text-primary-400">{folder?.title}</span> 폴더를 삭제하시겠습니까?
        </p>
      </div>
    </ConfirmDialog>
  );
}
