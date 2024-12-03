"use client";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import Image from "next/image";

export default function CreateButton() {
  const { openMutateFolder } = useOpenDialogStore();
  const { selectLinkBook } = useSelectLinkBookStore();

  const handleClick = () => {
    selectLinkBook(undefined);
    openMutateFolder(true);
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
