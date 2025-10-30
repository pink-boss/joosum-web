import { FormEvent, useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useDeleteAccount } from '@/services/auth';

import ButtonLoading from '@/components/button-loading';
import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';

import { CloseDialogIcon } from '@/assets/icons';

export default function AccountDeleteDialog() {
  const { isDeleteAccountOpen: isOpen, openDeleteAccount: open, openAccount } = useDialogStore();

  const deleteAccount = useDeleteAccount();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleDeleteAccount = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      deleteAccount.mutate();
    },
    [deleteAccount],
  );

  const handleMaintainService = useCallback(() => {
    handleClose();
    openAccount(true);
  }, [handleClose, openAccount]);

  return (
    <DefaultDialog className="w-132 px-5 py-10" open={isOpen} onCloseCallback={handleClose}>
      <form className="flex flex-col items-center gap-5 text-center" onSubmit={handleDeleteAccount}>
        <div className="flex w-full flex-col px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <Dialog.Title className="text-24-32 font-bold text-black">회원 탈퇴</Dialog.Title>
            <button type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
          <div className="mt-4">
            <Dialog.Description className="text-18-26 font-semibold tracking-[-0.2px] text-gray-800">
              탈퇴 시 아래 데이터가 모두 삭제됩니다.
            </Dialog.Description>
            <span className="mt-4 rounded-2xl bg-gray-200 px-[79.5px] py-3 text-18-26 font-normal tracking-[-0.2px] text-gray-900">
              저장된 링크 / 폴더와 태그 / 계정 정보
            </span>
            <div className="mt-5 p-2.5">
              <span className="text-18-26 font-normal tracking-[-0.2px] text-gray-700">
                같은 계정으로{' '}
                <span className="inline-block text-18-26 font-bold tracking-[-0.2px] text-paperabovebg">
                  재가입은 탈퇴 후 30일이 지나야 가능
                </span>
                합니다.
              </span>
              <span className="text-18-26 font-normal tracking-[-0.2px] text-gray-700">
                재가입 시 저장했던 링크, 폴더 태그는{' '}
                <span className="inline-block text-18-26 font-bold tracking-[-0.2px] text-paperabovebg">
                  복구되지 않습니다.
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full px-6">
          <hr className="w-full border-gray-500" />
        </div>
        <div className="flex flex-col gap-5">
          <span className="p-2.5 text-24-26 font-semibold tracking-[-0.2px] text-gray-900">
            정말 계정을 탈퇴 하시겠어요?
          </span>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-5" htmlFor="agreement">
              <input
                required
                className="peer sr-only"
                id="agreement"
                name="agreement"
                type="radio"
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('회원 탈퇴를 동의해주세요.')}
              />
              <div className="hidden size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:flex">
                <div className="size-3 rounded-full bg-primary-500" />
              </div>
              <div className="block size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:hidden" />
              <span className="text-18-26 font-normal tracking-[-0.2px] text-gray-900">
                위 안내사항을 확인하였으며 이에 동의합니다.
              </span>
            </label>
          </div>
        </div>
        <div className="flex w-full gap-1 px-6 pt-3">
          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-500 px-10 py-4 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            disabled={deleteAccount.isPending}
            type="submit"
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-inherit">탈퇴하기</span>
            <ButtonLoading loading={deleteAccount.isPending} />
          </button>
          <button
            className="flex-1 rounded-lg bg-primary-500 px-10 py-4 font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            disabled={deleteAccount.isPending}
            type="button"
            onClick={handleMaintainService}
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-inherit">주섬 계속 이용하기</span>
          </button>
        </div>
      </form>
    </DefaultDialog>
  );
}
