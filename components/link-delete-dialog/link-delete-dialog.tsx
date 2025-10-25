'use client';

import { useCallback } from 'react';

import { useDeleteLink } from '@/services/link';

import ConfirmDialog from '@/components/confirm-dialog';

import { useCheckLink } from '@/hooks/zustand';
import { useDialogStore } from '@/libs/zustand/store';

// 링크 삭제 모달
export default function LinkDeleteDialog() {
  const { isDeleteLinkOpen: isOpen, openDeleteLink: open, linkDataTestId } = useDialogStore();
  const { cachedLinks, clearLinks } = useCheckLink();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleSuccess = useCallback(() => {
    clearLinks();
    handleClose();
  }, [clearLinks, handleClose]);

  const mutation = useDeleteLink({ onSuccess: handleSuccess, linkIds: [...cachedLinks] });

  const handleSubmit = useCallback(async () => {
    mutation.mutate();
  }, [mutation]);

  return (
    <ConfirmDialog
      // 링크 삭제 > 모달 취소
      cancelDataTestId={`cancel_deleteLink_editOn_${linkDataTestId}`}
      closeProps={{ children: '취소', onClick: handleClose }}
      open={isOpen}
      // 링크 삭제 > 모달 삭제
      submitDataTestId={`delete_deleteLink_editOn_${linkDataTestId}`}
      submitLoading={mutation.isPending}
      onCloseCallback={handleClose}
      submitProps={{
        children: '삭제',
        onClick: handleSubmit,
      }}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-center text-gray-800">
          <p>{cachedLinks.size} 개의 링크를</p>
          <p>삭제하겠습니까?</p>
        </div>
        <div>삭제된 링크는 복구되지 않습니다.</div>
      </div>
    </ConfirmDialog>
  );
}
