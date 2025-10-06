'use client';

import { ReactNode, useCallback } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { useDrawerStore } from '@/libs/zustand/store';

interface Props {
  children: ReactNode;
  className?: string;
  onCloseCallback: () => void;
  open: boolean;
  dataTestId?: string;
}

export default function DefaultDrawer({ open, children, className, onCloseCallback, dataTestId }: Props) {
  const { isLinkDrawerOpen, openLinkDrawer, isUserDrawerOpen, openUserDrawer } = useDrawerStore();

  const handleClose = useCallback(() => {
    onCloseCallback();
    if (isLinkDrawerOpen) openLinkDrawer(false);
    if (isUserDrawerOpen) openUserDrawer(false);
  }, [isLinkDrawerOpen, isUserDrawerOpen, onCloseCallback, openLinkDrawer, openUserDrawer]);

  if (!open) return null;

  const drawer = (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" role="presentation" onClick={handleClose} />
      <div
        aria-modal
        aria-keyshortcuts="Escape"
        aria-labelledby="drawer"
        data-testid={dataTestId}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'fixed right-0 top-0 z-20 h-full w-[494px]',
          'border border-gray-200',
          'bg-white pb-20 pt-5',
          'flex flex-col gap-10',
          'overflow-y-auto',
          className && className,
        )}
      >
        {children}
      </div>
    </>
  );

  const drawerRoot = document.getElementById('drawer-root');

  if (!drawerRoot) return null;

  return createPortal(drawer, drawerRoot);
}
