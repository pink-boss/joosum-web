import clsx from "clsx";
import {
  CreateLinkBook,
  DefaultFolderProps,
  EntireFolderProps,
  OptionalFolderProps,
} from "./type";
import Image from "next/image";
import DropdownMore from "./dropdown/more";
import { ReactNode } from "react";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import { useRouter } from "next/navigation";
import LinkToPage, {
  isNormalLinkBook,
} from "@/components/link-book/LinkToPage";

type FolderBookInputProps = Partial<CreateLinkBook> & {
  children?: ReactNode;
  isPreview?: boolean;
};

export function FolderBook({
  backgroundColor,
  illustration,
  title = "폴더명을 입력해주세요.",
  titleColor,
  children,
  isPreview = false,
}: FolderBookInputProps) {
  return (
    <div
      data-testid="folder-book"
      className={clsx(
        "relative flex flex-col justify-between shadow",
        isPreview
          ? `h-[176px] w-[130px] rounded-lg`
          : "w-full flex-1 rounded-xl",
      )}
      style={{ backgroundColor }}
    >
      <div
        className={clsx(
          "absolute left-[13.2px] h-full bg-black opacity-10",
          isPreview ? "w-0.5" : "w-[3.3px]",
        )}
      ></div>
      <div
        data-testid="folder-book-title"
        className={clsx(
          "truncate font-bold",
          isPreview
            ? "ml-[22px] mt-4 w-[94px] text-base"
            : "ml-[33px] mt-[19.8px] w-[121px] text-lg",
        )}
        style={{ color: titleColor }}
      >
        {title}
      </div>
      {illustration && (
        <div
          className={clsx(
            isPreview ? "mb-4 ml-[34px]" : "mb-[13.2px] ml-[41.66px]",
          )}
        >
          <Image
            src={`/link-book/${illustration}.png`}
            alt={illustration}
            width={isPreview ? 80 : 118.8}
            height={isPreview ? 80 : 118.8}
          />
        </div>
      )}
      {children}
    </div>
  );
}

type InputProps = { linkBook: EntireFolderProps };

export default function Folder({ linkBook }: InputProps) {
  return (
    <LinkToPage linkBook={linkBook}>
      <div
        className={clsx(
          "flex h-[275.9px] w-[174.9px] cursor-pointer flex-col items-center gap-[17.6px]",
        )}
      >
        <FolderBook {...linkBook}>
          {isNormalLinkBook(linkBook) && linkBook.isDefault !== "y" && (
            <div
              className="absolute bottom-[13.3px] right-[13.53px] p-px"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMore linkBook={linkBook} />
            </div>
          )}
        </FolderBook>
        <div className="text-text-secondary">{linkBook.linkCount}개</div>
      </div>
    </LinkToPage>
  );
}
