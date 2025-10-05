import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { useDeleteAccount } from '@/services/auth';

import ButtonLoading from '@/components/button-loading';
import Dialog from '@/components/dialog';

import { useDialogStore } from '@/libs/zustand/store';

export default function AccountDeleteDialog() {
  const { isDeleteAccountOpen: isOpen, openDeleteAccount: open, openAccount } = useDialogStore();

  const deleteAccount = useDeleteAccount();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleDeleteAccount = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
    <Dialog className="w-[528px] px-5 py-10" open={isOpen} testId="delete-account" onCloseCallback={handleClose}>
      <form className="flex flex-col items-center gap-5 text-center" onSubmit={handleDeleteAccount}>
        <div className="flex w-full flex-col px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">회원 탈퇴</span>
            <button type="button" onClick={handleClose}>
              <Image alt="close" height={24} src="/icons/basic-close.png" width={24} />
            </button>
          </div>
          {/* instruction */}
          <div className="mt-4 text-lg">
            <div className="font-semibold text-gray-ink">탈퇴 시 아래 데이터가 모두 삭제됩니다.</div>
            <div className={clsx('rounded-2xl bg-gray-ghost text-gray-black', 'mt-4 px-[79.5px] py-3')}>
              저장된 링크 / 폴더와 태그 / 계정 정보
            </div>
            <div className="p-[10px] pt-5 text-gray-dim">
              <p>
                같은 계정으로 <span className="font-bold text-paperabovebg">재가입은 탈퇴 후 30일이 지나야 가능</span>
                합니다.
              </p>
              <p>
                재가입 시 저장했던 링크, 폴더 태그는{' '}
                <span className="font-bold text-paperabovebg">복구되지 않습니다.</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-6">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="p-[10px] text-2xl font-semibold text-gray-black">정말 계정을 탈퇴 하시겠어요?</div>
          <div className="flex items-center gap-[20px]">
            <input
              required
              className="size-6"
              id="agreement"
              name="agreement"
              type="radio"
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('회원 탈퇴를 동의해주세요.')}
            />
            <label className="text-lg text-gray-black" htmlFor="agreement">
              위 안내사항을 확인하였으며 이에 동의합니다.
            </label>
          </div>
        </div>
        <div className="flex w-full gap-1 px-6 pt-3">
          <button
            disabled={deleteAccount.isPending}
            type="submit"
            className={clsx(
              'flex-1 rounded-lg bg-gray-silver px-10 py-4',
              'flex items-center justify-center gap-2 font-bold text-white',
              deleteAccount.isPending ? 'cursor-not-allowed bg-gray-vapor' : '',
            )}
          >
            <span>탈퇴하기</span>
            <ButtonLoading loading={deleteAccount.isPending} />
          </button>
          <button
            className={clsx('flex-1 rounded-lg bg-primary-500 px-10 py-4', 'font-bold text-white')}
            disabled={deleteAccount.isPending}
            type="button"
            onClick={handleMaintainService}
          >
            주섬 계속 이용하기
          </button>
        </div>
      </form>
    </Dialog>
  );
}
