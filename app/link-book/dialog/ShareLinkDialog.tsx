"use client";

import Image from "next/image";

import Dialog from "@/components/dialog/Dialog";
import useLinkCache from "@/hooks/link/useLinkCache";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { toast } from "@/components/notification/toast";

export default function ShareLinkDialog() {
  const {
    key,
    isShareLinkOpen: isOpen,
    openShareLink: open,
  } = useOpenDialogStore();
  const link = useLinkCache(key);

  const onClose = () => {
    open(false);
  };

  async function handleCopyLink() {
    if (link?.url) {
      await navigator.clipboard.writeText(link?.url);
      toast({ status: "success", message: "링크가 복사되었습니다." });
    }
  }
  async function handleShareToKakao() {}

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[421.78px]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-bold">공유하기</span>
          <div className="flex gap-10">
            <button
              className="flex flex-col items-center gap-1"
              onClick={handleCopyLink}
            >
              <Image
                src="/copy-link.png"
                alt="copy-link"
                width={60}
                height={60}
              />
              <span className="text-sm text-gray-black">링크 복사</span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={handleShareToKakao}
            >
              <Image src="/kakao.png" alt="kakao" width={60} height={60} />
              <span className="text-sm text-gray-black">카카오톡</span>
            </button>
          </div>
        </div>
        <div className="mt-3 w-full">
          <button
            className="h-[56px] w-full rounded-lg bg-gray-silver font-bold text-white"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </Dialog>
  );
}
