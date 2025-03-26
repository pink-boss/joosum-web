import { SelectLinkBook } from "@/app/link-book/dialog/dynamic";
import { Button } from "@/app/my-folder/CreateDialogButton";
import { LinkBook } from "@/types/linkBook.types";
import Image from "next/image";

type InputProps = {
  linkBookId?: LinkBook["linkBookId"];
  setLinkBookId: (
    linkBookName: LinkBook["title"],
    linkBookId: LinkBook["linkBookId"],
  ) => void;
};

export default function Folder({ linkBookId, setLinkBookId }: InputProps) {
  return (
    <div className="flex flex-col gap-2 text-gray-black">
      <div className="flex justify-between px-2">
        <label className="text-lg font-semibold">폴더</label>
        <Button className="flex font-semibold text-primary-500">
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
      />
    </div>
  );
}
