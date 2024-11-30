"use client";
import { useOpenDialogStore } from "@/store/useDialog";
import Image from "next/image";

export default function CreateButton() {
  const { openCreateFolderDialog } = useOpenDialogStore();
  return (
    <button
      data-testid="create-dialog-button"
      className="flex rounded bg-primary py-[6px] pl-2 pr-3 font-semibold text-white"
      onClick={() => openCreateFolderDialog(true)}
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
