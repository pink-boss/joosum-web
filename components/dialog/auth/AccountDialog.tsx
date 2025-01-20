import clsx from "clsx";
import Image from "next/image";
import { ReactNode, ButtonHTMLAttributes } from "react";

import useQueryAccount from "@/hooks/useQueryAccount";
import { useOpenDialogStore } from "@/store/useDialogStore";

import Dialog from "../Dialog";

type InputProps = {};

export default function AccountDialog({}: InputProps) {
  const { isAccountOpen: isOpen, openAccount: open } = useOpenDialogStore();
  const { data } = useQueryAccount();

  const onClose = () => {
    open(false);
  };

  //   const mutation = useDeleteLink(onClose, [...cachedLinks]);

  //   async function handleSubmit() {
  //     mutation.mutate();
  //   }

  return (
    <Dialog
      className="h-[408px] w-[500px] px-5 py-10"
      open={isOpen}
      onCloseCallback={onClose}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col gap-[30px] px-6">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">내 계정</span>
            <button className="">
              <Image
                src="/icons/basic-close.png"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="ml-0.5 flex items-center gap-5">
            <div
              className={clsx(
                "size-10 rounded-full border border-gray-silver",
                "flex items-center justify-center",
                data?.social === "apple" && "bg-black",
              )}
            >
              <Image
                src={`/logo/${data?.social}.png`}
                alt="social"
                width={24}
                height={24}
              />
            </div>
            <span className="text-xl font-bold text-gray-black">
              {data?.email}
            </span>
          </div>
          <div className="flex flex-col gap-5 pb-5 pl-[10px]">
            <div className="gap-5">
              <div
                className={clsx(
                  "flex justify-between",
                  "text-lg text-gray-black",
                )}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/hyper-link.png"
                    alt="hyper-link"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold">링크</span>
                </div>

                <span className="">1,423개</span>
              </div>
            </div>
            <div className="gap-5">
              <div
                className={clsx(
                  "flex justify-between",
                  "text-lg text-gray-black",
                )}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/icon-folder2.png"
                    alt="hyper-link"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold">폴더</span>
                </div>

                <span className="">12개</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-6">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div className="flex w-full justify-between px-6 pt-3">
          <div className="mt-4">
            <button className="text-lg text-gray-slate underline underline-offset-4">
              회원탈퇴
            </button>
          </div>
          <button
            className={clsx(
              "rounded-lg bg-gray-silver px-10 py-4",
              "font-bold text-white",
            )}
          >
            로그아웃
          </button>
        </div>
      </div>
    </Dialog>
  );
}
