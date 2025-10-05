import Image from 'next/image';

import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

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
      <Image alt="exit" height={24} src="/icons/icon-exit.png" width={24} />
    </button>
  );
}
