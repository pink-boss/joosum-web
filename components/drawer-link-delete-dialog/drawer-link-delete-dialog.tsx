'use client';

import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useDeleteDrawerLink } from '@/services/link';

import ConfirmDialog from '@/components/confirm-dialog';

import { useDialogStore, useDrawerStore } from '@/libs/zustand/store';

// NOTES: 사용안함?
export default function DrawerLinkDeleteDialog() {
  const { isDeleteDrawerLinkOpen: isOpen, openDeleteDrawerLink: open } = useDialogStore();
  const { link, openLinkDrawer } = useDrawerStore();

  const handleClose = useCallback(() => {
    open(false);
    openLinkDrawer(false);
  }, [open, openLinkDrawer]);

  const mutation = useDeleteDrawerLink({ onSuccess: handleClose, linkId: link?.linkId ?? '' });

  const handleSubmit = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  if (!link) return null;

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
      <div className="flex flex-col gap-4 text-center">
        <Dialog.Title className="text-center text-gray-800">삭제하겠습니까?</Dialog.Title>
        <Dialog.Description>삭제된 링크는 복구되지 않습니다.</Dialog.Description>
      </div>
    </ConfirmDialog>
  );
}
