'use client';

import { ReactNode, useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useDrawerStore } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';

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

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          data-testid={dataTestId}
          className={clsx(
            'fixed right-0 top-0 z-20 flex h-full w-123.5 flex-col gap-10 overflow-y-auto border border-gray-200 bg-white pb-20 pt-5',
            className && className,
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
