import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { useGetAccount } from '@/services/auth';

import Dialog from '@/components/dialog';

import { useDialogStore } from '@/libs/zustand/store';
import { formatNumber } from '@/utils/number';

import { CloseDialogIcon, FolderIcon, HyperlinkOutlineIcon } from '@/assets/icons';

// 내 계정 모달
export default function AccountDialog() {
  const { isAccountOpen: isOpen, openAccount: open, openDeleteAccount, openLogout } = useDialogStore();

  const { data } = useGetAccount();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleDeleteAccount = useCallback(async () => {
    openDeleteAccount(true);
    open(false);
  }, [open, openDeleteAccount]);

  const handleLogout = useCallback(async () => {
    handleClose();
    openLogout(true);
  }, [handleClose, openLogout]);

  return (
    <Dialog className="h-[408px] w-[500px] px-5 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col gap-[30px] px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">내 계정</span>
            <button data-testid="close_myAccount_myPage" type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
          <div className="ml-0.5 flex items-center gap-5">
            <div
              className={clsx(
                'size-10 rounded-full border border-gray-silver',
                'flex items-center justify-center',
                data?.user.social === 'apple' && 'bg-black',
              )}
            >
              <Image alt="social" height={24} src={`/images/logo-${data?.user.social}.png`} width={24} />
            </div>
            <span className="truncate text-xl font-bold text-gray-black">{data?.user.email}</span>
          </div>
          <div className="flex flex-col gap-5 pb-5 pl-[10px]">
            <div className="gap-5">
              <div className={clsx('flex justify-between', 'text-lg text-gray-black')}>
                <div className="flex items-center gap-5">
                  <HyperlinkOutlineIcon aria-hidden="true" className="size-6 text-gray-700" />
                  <span className="font-bold">링크</span>
                </div>
                <span className="">{formatNumber(data?.totalLinkCount || 0)}개</span>
              </div>
            </div>
            <div className="gap-5">
              <div className={clsx('flex justify-between', 'text-lg text-gray-black')}>
                <div className="flex items-center gap-5">
                  <FolderIcon aria-hidden="true" className="size-6 text-gray-700" />
                  <span className="font-bold">폴더</span>
                </div>
                <span className="">{formatNumber(data?.totalFolderCount || 0)}개</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-6">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div className="flex w-full justify-between px-6 pt-3">
          <div className="mt-4">
            <button
              className="text-lg text-gray-slate underline underline-offset-4"
              data-testid="deleteAccount_myAccount_myPage"
              type="button"
              onClick={handleDeleteAccount}
            >
              회원탈퇴
            </button>
          </div>
          <button
            className={clsx('rounded-lg bg-gray-silver px-10 py-4', 'font-bold text-white')}
            data-testid="logout_myAccount_myPage"
            type="button"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </Dialog>
  );
}
