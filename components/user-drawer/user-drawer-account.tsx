import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

import { ChevronRightIcon } from '@/assets/icons';

import { Account as AccountType } from '@/types/account.types';

interface Props extends Pick<AccountType, 'email'> {}

export default function UserDrawerAccount({ email }: Props) {
  const { openAccount: openAccountDialog } = useDialogStore();

  const handleOpen = useCallback(() => {
    openAccountDialog(true);
  }, [openAccountDialog]);

  return (
    <div className="mb-2.5">
      <span className="bg-gray-200 px-10 py-3 text-18-24 font-bold tracking-[-0.2px] text-gray-700">내 계정</span>
      <div className="flex flex-col gap-2.5 px-10 py-5">
        <span className="text-18-24 font-semibold tracking-[-0.2px] text-gray-700">내 계정</span>
        <button className="flex justify-between" data-testid="myAccount_myPage" type="button" onClick={handleOpen}>
          <span className="text-18-24 font-bold tracking-[-0.2px] text-gray-900">{email || ' '}</span>
          <ChevronRightIcon aria-hidden="true" className="size-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
