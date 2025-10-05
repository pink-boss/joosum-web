import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { useGetAccount } from '@/services/auth';

import Drawer from '@/components/drawer/drawer';

import { useDrawerStore } from '@/libs/zustand/store';

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
    <Drawer dataTestId="myPage" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col gap-10">
        <button className="px-5 py-1" type="button" onClick={handleClose}>
          <Image alt="close" height={24} src="/icons/icon-right-double.png" width={24} />
        </button>
        <div className={clsx('flex flex-col gap-5', 'text-lg text-gray-dim')}>
          <UserDrawerAccount email={data?.user.email ?? ''} />
          <UserDrawerSetting />
          <div className={clsx('border-t border-gray-silver')} />
          <UserDrawerSupport email={data?.user.email ?? ''} />
          <div className={clsx('border-t border-gray-silver')} />
          <UserDrawerLogout />
        </div>
      </div>
    </Drawer>
  );
}
