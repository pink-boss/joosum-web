import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useLogout } from '@/services/auth';

import ConfirmDialog from '@/components/confirm-dialog';

import { useDialogStore } from '@/libs/zustand/store';

export default function LogoutDialog() {
  const { isLogoutOpen: isOpen, openLogout: open } = useDialogStore();

  const logout = useLogout();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleLogout = useCallback(async () => {
    logout.mutate();
  }, [logout]);

  return (
    <ConfirmDialog
      open={isOpen}
      submitLoading={logout.isPending}
      onCloseCallback={handleClose}
      closeProps={{
        children: '취소',
        onClick: handleClose,
      }}
      submitProps={{
        children: '확인',
        onClick: handleLogout,
      }}
    >
      <Dialog.Title className="text-24-32 font-bold text-black">로그아웃 하시겠습니까?</Dialog.Title>
    </ConfirmDialog>
  );
}
