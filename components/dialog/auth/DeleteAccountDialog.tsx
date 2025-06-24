import clsx from "clsx";
import Image from "next/image";

import ButtonLoading from "@/components/ButtonLoading";
import useDelete from "@/hooks/auth/useDelete";
import { useOpenDialogStore } from "@/store/useDialogStore";

import Dialog from "../Dialog";

type InputProps = {};

export default function DeleteAccountDialog({}: InputProps) {
  const {
    isDeleteAccountOpen: isOpen,
    openDeleteAccount: open,
    openAccount,
  } = useOpenDialogStore();

  const onClose = () => {
    open(false);
  };
  const deleteAccount = useDelete();

  async function handleDeleteAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    deleteAccount.mutate();
  }

  async function handleMaintainService() {
    onClose();
    openAccount(true);
  }

  return (
    <Dialog
      testId="delete-account"
      className="w-[528px] px-5 py-10"
      open={isOpen}
      onCloseCallback={onClose}
    >
      <form
        className="flex flex-col items-center gap-5 text-center"
        onSubmit={handleDeleteAccount}
      >
        <div className="flex w-full flex-col px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">회원 탈퇴</span>
            <button onClick={onClose}>
              <Image
                src="/icons/basic-close.png"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          </div>
          {/* instruction */}
          <div className="mt-4 text-lg">
            <div className="font-semibold text-gray-ink">
              탈퇴 시 아래 데이터가 모두 삭제됩니다.
            </div>
            <div
              className={clsx(
                "rounded-2xl bg-gray-ghost text-gray-black",
                "mt-4 px-[79.5px] py-3",
              )}
            >
              저장된 링크 / 폴더와 태그 / 계정 정보
            </div>
            <div className="p-[10px] pt-5 text-gray-dim">
              <p>
                같은 계정으로{" "}
                <span className="font-bold text-paperabovebg">
                  재가입은 탈퇴 후 30일이 지나야 가능
                </span>
                합니다.
              </p>
              <p>
                재가입 시 저장했던 링크, 폴더 태그는{" "}
                <span className="font-bold text-paperabovebg">
                  복구되지 않습니다.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-6">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="p-[10px] text-2xl font-semibold text-gray-black">
            정말 계정을 탈퇴 하시겠어요?
          </div>
          <div className="flex items-center gap-[20px]">
            <input
              type="radio"
              id="agreement"
              name="agreement"
              className="size-6"
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "회원 탈퇴를 동의해주세요.",
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
            />
            <label htmlFor="agreement" className="text-lg text-gray-black">
              위 안내사항을 확인하였으며 이에 동의합니다.
            </label>
          </div>
        </div>
        <div className="flex w-full gap-1 px-6 pt-3">
          <button
            type="submit"
            className={clsx(
              "flex-1 rounded-lg bg-gray-silver px-10 py-4",
              "flex items-center justify-center gap-2 font-bold text-white",
              deleteAccount.isPending ? "cursor-not-allowed bg-gray-vapor" : "",
            )}
            disabled={deleteAccount.isPending}
          >
            <span>탈퇴하기</span>
            <ButtonLoading loading={deleteAccount.isPending} />
          </button>

          <button
            type="button"
            className={clsx(
              "flex-1 rounded-lg bg-primary-500 px-10 py-4",
              "font-bold text-white",
            )}
            onClick={handleMaintainService}
            disabled={deleteAccount.isPending}
          >
            주섬 계속 이용하기
          </button>
        </div>
      </form>
    </Dialog>
  );
}
