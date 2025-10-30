import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useGetAccount } from '@/services/auth';

import DefaultDrawer from '@/components/default-drawer';

import { useDrawerStore } from '@/libs/zustand/store';

import { DoubleRightIcon } from '@/assets/icons';

import UserDrawerAccount from './user-drawer-account';
import UserDrawerLogout from './user-drawer-logout';
import UserDrawerSetting from './user-drawer-setting';
import UserDrawerSupport from './user-drawer-support';

export default function UserDrawer() {
  const { isUserDrawerOpen: isOpen, openUserDrawer: open } = useDrawerStore();

  const { data } = useGetAccount();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <DefaultDrawer dataTestId="myPage" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col gap-10">
        <button className="px-5 py-2.5" type="button" onClick={handleClose}>
          <DoubleRightIcon aria-hidden="true" className="size-6 text-gray-900" />
        </button>
        <Dialog.Title className="sr-only">내 정보</Dialog.Title>
        <div className="flex flex-col">
          <UserDrawerAccount email={data?.user.email ?? ''} />
          <UserDrawerSetting />
          <hr className="my-2.5 w-full border-gray-300" />
          <UserDrawerSupport email={data?.user.email ?? ''} />
          <hr className="my-2.5 w-full border-gray-300" />
          <UserDrawerLogout />
        </div>
      </div>
    </DefaultDrawer>
  );
}
