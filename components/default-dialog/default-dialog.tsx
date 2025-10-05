'use client';

import { ReactNode, useCallback } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { useDialogStore } from '@/libs/zustand/store';

export interface DefaultDialogProps {
  children: ReactNode;
  className?: string;
  onCloseCallback: () => void;
  open: boolean;
  testId?: string;
}

export default function DefaultDialog({ open, children, className, onCloseCallback, testId }: DefaultDialogProps) {
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

  if (!open) return null;

  const modal = (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" role="presentation" onClick={onClose} />
      <div
        aria-modal
        aria-labelledby="dialog"
        data-testid={testId}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2',
          'rounded-2xl bg-white p-10 shadow-xl',
          className && className,
        )}
      >
        {children}
      </div>
    </>
  );

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(modal, modalRoot);
}
