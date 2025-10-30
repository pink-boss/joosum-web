import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

import { ExitIcon } from '@/assets/icons';

export default function UserDrawerLogout() {
  const { openLogout } = useDialogStore();

  const handleLogout = useCallback(() => {
    openLogout(true);
  }, [openLogout]);

  return (
    <div className="w-full px-10 py-5">
      <button
        className="flex w-full items-center justify-between"
        data-testid="logout_myPage"
        type="button"
        onClick={handleLogout}
      >
        <span className="text-left text-18-24 font-semibold tracking-[-0.2px] text-gray-700">로그아웃</span>
        <ExitIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
    </div>
  );
}
