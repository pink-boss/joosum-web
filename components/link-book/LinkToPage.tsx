import {
  DefaultFolderProps,
  EntireFolderProps,
  OptionalFolderProps,
} from "@/types/linkBook.types";
import { replaceSpacesWithDash } from "@/utils/urlEncoder";
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
  let path = "/link-book";
  if (isNormalLinkBook(linkBook) && linkBook.linkBookId) {
    path += `/${linkBook.title}`;
  }

  const handleClick = () => {
    if (onClickCallback) {
      onClickCallback();
    }
  };

  return (
    <Link href={replaceSpacesWithDash(path)} onClick={handleClick}>
      {children}
    </Link>
  );
}
