"use client";

import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useOpenDialogStore } from "@/store/useDialogStore";
import Image from "next/image";
import { ReactNode } from "react";

type InputProps = {
  children: ReactNode;
  className: string;
  onClickCallback?: () => void;
};

export function Button({ children, className, onClickCallback }: InputProps) {
  const { openMutateLinkBook } = useOpenDialogStore();
  const { clearLinkBook } = useSelectLinkBook();

  const handleClick = () => {
    clearLinkBook();
    openMutateLinkBook(true);

    if (onClickCallback) {
      onClickCallback();
    }
  };
  return (
    <button
      data-testid="create-folder-dialog-button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default function CreateDialogButton() {
  return (
    <Button className="bg-primary-500 flex rounded py-[6px] pl-2 pr-3 font-semibold text-white">
      <Image
        src="/icons/icon-plus-white.png"
        alt="plus"
        width={24}
        height={24}
      />
      폴더 추가
    </Button>
  );
}
