'use client';
import { useCallback, useEffect, useState } from 'react';

import { useGetFolderFromTitle, useGetFolders, useReassignFolder } from '@/services/folder';

import ConfirmDialog from '@/components/confirm-dialog';
import FolderDropdown from '@/components/folder-dropdown';

import { useCheckLink } from '@/hooks/zustand';
import { useDialogStore, useSearchLinkFilterStore } from '@/libs/zustand/store';

import { Folder } from '@/types/folder.types';

// 폴더 이동 모달
export default function FolderReassignDialog() {
  const { isReassignFolderOpen: isOpen, openReassignFolder: open, linkDataTestId } = useDialogStore();
  const { folderId: searchFolderId } = useSearchLinkFilterStore();

  const { data: folders } = useGetFolders('created_at');
  const { cachedLinks, clearLinks } = useCheckLink();
  const fromFolder = useGetFolderFromTitle();

  const [toFolderId, setToFolderId] = useState<Folder['linkBookId'] | undefined>(undefined);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleSuccess = useCallback(() => {
    clearLinks();
    handleClose();
  }, [clearLinks, handleClose]);

  const mutation = useReassignFolder({ onSuccess: handleSuccess });

  const handleSubmit = useCallback(async () => {
    if (toFolderId && cachedLinks.size) {
      mutation.mutate({
        toLinkBookId: toFolderId,
        linkIds: [...cachedLinks],
      });
    }
  }, [mutation, toFolderId, cachedLinks]);

  useEffect(() => {
    if (folders) {
      setToFolderId(folders.linkBooks?.[0]?.linkBookId);
    }
  }, [folders]);

  return (
    <ConfirmDialog
      // 폴더 이동 > 모달 취소
      cancelDataTestId={linkDataTestId === 'searchResult' ? 'cancel_moveFolder_editOn_searchResult' : ''}
      closeProps={{ children: '취소', onClick: handleClose }}
      open={isOpen}
      // 폴더 이동 > 모달 확인
      submitDataTestId={linkDataTestId === 'searchResult' ? 'confirm_moveFolder_editOn_searchResult' : ''}
      submitLoading={mutation.isPending}
      onCloseCallback={handleClose}
      submitProps={{
        children: '이동',
        onClick: handleSubmit,
        disabled: !toFolderId,
      }}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-center text-gray-800">
          <p>{cachedLinks.size} 개의 링크가</p>
          <p>이동할 폴더를 선택해주세요.</p>
        </div>
        <FolderDropdown
          className="w-76.25"
          folderId={toFolderId}
          fromFolderId={fromFolder?.linkBookId || searchFolderId}
          setFolderId={(_, id) => setToFolderId(id)}
        />
      </div>
    </ConfirmDialog>
  );
}
