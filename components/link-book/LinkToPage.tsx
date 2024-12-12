import {
  DefaultFolderProps,
  EntireFolderProps,
  OptionalFolderProps,
} from "@/types/linkBook.types";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import Link from "next/link";
import { ReactNode } from "react";

export function isNormalLinkBook(
  linkBook: EntireFolderProps,
): linkBook is DefaultFolderProps {
  const requiredFields = [] as Array<
    keyof Omit<OptionalFolderProps, "illustration">
  >;

  return requiredFields.every((field) => linkBook[field] !== undefined);
}

type InputProps = {
  children: ReactNode;
  linkBook: EntireFolderProps;
  onClickCallback?: () => void;
};

export default function LinkToPage({
  children,
  linkBook,
  onClickCallback,
}: InputProps) {
  const { selectLinkBook } = useSelectLinkBookStore();
  let path = "/link-book";
  if (isNormalLinkBook(linkBook) && linkBook.linkBookId) {
    path += `/${linkBook.linkBookId}`;
  }

  const handleClick = () => {
    if (isNormalLinkBook(linkBook)) {
      selectLinkBook(linkBook);
    }
    if (onClickCallback) {
      onClickCallback();
    }
  };

  return (
    <Link href={path} onClick={handleClick}>
      {children}
    </Link>
  );
}

//TODO: 캐시에서 linkBook 찾아오는 훅 필요
