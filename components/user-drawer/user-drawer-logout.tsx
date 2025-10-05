import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

import { ExitIcon } from '@/assets/icons';

export default function UserDrawerLogout() {
  const { openLogout } = useDialogStore();

  const handleLogout = useCallback(() => {
    openLogout(true);
  }, [openLogout]);

  return (
    <button
      className="flex cursor-pointer justify-between px-10 font-semibold"
      data-testid="logout_myPage"
      type="button"
      onClick={handleLogout}
    >
      <span className="text-left">로그아웃</span>
      <ExitIcon aria-hidden="true" className="size-6 text-gray-500" />
    </button>
  );
}
