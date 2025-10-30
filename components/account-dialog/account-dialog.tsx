import Image from 'next/image';

import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useGetAccount } from '@/services/auth';

import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';
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
    <DefaultDialog className="h-102 w-125 px-5 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col gap-7.5 px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <Dialog.Title className="text-24-32 font-bold">내 계정</Dialog.Title>
            <button data-testid="close_myAccount_myPage" type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
          <div className="flex items-center gap-5 pl-0.5">
            <div
              className={clsx(
                'flex size-10 items-center justify-center rounded-full border border-gray-500',
                data?.user.social === 'apple' && 'bg-black',
              )}
            >
              <Image alt="social" height={24} src={`/images/logo-${data?.user.social}.png`} width={24} />
            </div>
            <span className="truncate text-20-24 font-bold tracking-[-0.2px] text-gray-900">{data?.user.email}</span>
          </div>
          <div className="flex flex-col gap-5 pb-5 pl-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <HyperlinkOutlineIcon aria-hidden="true" className="size-6 text-gray-700" />
                <span className="text-18-21 font-bold tracking-[-0.2px] text-gray-900">링크</span>
              </div>
              <span className="text-18-21 font-normal tracking-[-0.2px] text-gray-900">
                {formatNumber(data?.totalLinkCount || 0)}개
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <FolderIcon aria-hidden="true" className="size-6 text-gray-700" />
                <span className="text-18-21 font-bold tracking-[-0.2px] text-gray-900">폴더</span>
              </div>
              <span className="text-18-21 font-normal tracking-[-0.2px] text-gray-900">
                {formatNumber(data?.totalFolderCount || 0)}개
              </span>
            </div>
          </div>
        </div>
        <hr className="mx-11 w-[calc(100%-44px)] border-gray-500" />
        <div className="mt-3 flex w-full items-end justify-between px-6">
          <button
            className="text-gray-600 underline underline-offset-4"
            data-testid="deleteAccount_myAccount_myPage"
            type="button"
            onClick={handleDeleteAccount}
          >
            <span className="text-18-22 font-normal tracking-[-0.2px] text-inherit">회원탈퇴</span>
          </button>
          <button
            className="rounded-lg bg-gray-500 px-10 py-4 transition-colors hover:bg-gray-600"
            data-testid="logout_myAccount_myPage"
            type="button"
            onClick={handleLogout}
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-white">로그아웃</span>
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
