"use client";

import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useOpenDialogStore } from "@/store/useDialogStore";
import Image from "next/image";

export default function CreateDialogButton() {
  const { openMutateLinkBook } = useOpenDialogStore();
  const { clearLinkBook } = useSelectLinkBook();

  const handleClick = () => {
    clearLinkBook();
    openMutateLinkBook(true);
  };
  return (
    <button
      data-testid="create-dialog-button"
      className="flex rounded bg-primary py-[6px] pl-2 pr-3 font-semibold text-white"
      onClick={handleClick}
    >
      <Image
        src="/icons/icon-plus-white.png"
        alt="plus"
        width={24}
        height={24}
      />
      폴더 추가
    </button>
  );
}
