'use client';

import { ReactNode, useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useDialogStore } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';

export interface DefaultDialogProps {
  children: ReactNode;
  className?: string;
  onCloseCallback: () => void;
  open: boolean;
  testId?: string;
}

export default function DefaultDialog({ open, children, className, onCloseCallback }: DefaultDialogProps) {
  const {
    // folder
    isMutateFolderOpen,
    isDeleteFolderOpen,
    openMutateFolder,
    openDeleteFolder,

    // link
    isDeleteLinkOpen,
    openDeleteLink,
  } = useDialogStore();

  const onClose = useCallback(() => {
    onCloseCallback();
    if (isMutateFolderOpen) openMutateFolder(false);
    if (isDeleteFolderOpen) openDeleteFolder(false);
    if (isDeleteLinkOpen) openDeleteLink(false);
  }, [
    isDeleteFolderOpen,
    isDeleteLinkOpen,
    isMutateFolderOpen,
    onCloseCallback,
    openDeleteLink,
    openDeleteFolder,
    openMutateFolder,
  ]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className={clsx(
            'fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-10 shadow-modal',
            className && className,
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
