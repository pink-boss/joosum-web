import Image from "next/image";

import { SelectLinkBook } from "@/app/link-book/dialog/dynamic";
import { Button } from "@/app/my-folder/CreateDialogOpenButton";
import { LinkBook } from "@/types/linkBook.types";

type InputProps = {
  linkBookId?: LinkBook["linkBookId"];
  setLinkBookId: (
    linkBookName: LinkBook["title"],
    linkBookId: LinkBook["linkBookId"],
  ) => void;
  disabled?: boolean;
  onClickCreateFolderCallback?: () => void;
  onClickSelectFolderCallback?: () => void;
};

export default function Folder({
  linkBookId,
  setLinkBookId,
  disabled,
  onClickCreateFolderCallback,
  onClickSelectFolderCallback,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 text-gray-black">
      <div className="flex justify-between px-2">
        <label className="text-lg font-semibold">폴더</label>
        <Button
          className="flex items-center font-semibold text-primary-500"
          disabled={disabled}
          onClickCallback={onClickCreateFolderCallback}
        >
          <Image
            src="/icons/icon-plus.png"
            alt="new-folder"
            width={24}
            height={24}
          />
          새폴더
        </Button>
      </div>
      <SelectLinkBook
        linkBookId={linkBookId}
        setLinkBookId={setLinkBookId}
        className="border-none bg-gray-ghost"
        disabled={disabled}
        onClickCallback={onClickSelectFolderCallback}
      />
    </div>
  );
}
