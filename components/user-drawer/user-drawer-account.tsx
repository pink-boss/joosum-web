import { useCallback } from 'react';

import clsx from 'clsx';

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
    <div>
      <div className={clsx('bg-gray-200 px-10 py-2.5', 'font-bold')}>내 계정</div>
      <div className="flex flex-col gap-2.5 px-10 py-5">
        <div className="font-semibold">내 계정</div>
        <button className="flex justify-between" data-testid="myAccount_myPage" type="button" onClick={handleOpen}>
          <span className="font-bold text-gray-900">{email || ' '}</span>
          <ChevronRightIcon aria-hidden="true" className="size-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
