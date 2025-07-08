import Link from "next/link";
import { ReactNode } from "react";

import { EntireFolderProps, LinkBook } from "@/types/linkBook.types";
import { encodeForUrlPath } from "@/utils/urlEncoder";

type InputProps = {
  children: ReactNode;
  linkBook: LinkBook | EntireFolderProps;
  onClickCallback?: () => void;
};

export function isNormalLinkBook(
  linkBook: LinkBook | EntireFolderProps,
): linkBook is LinkBook {
  return "linkBookId" in linkBook && Boolean(linkBook.linkBookId);
}

export default function LinkToPage({
  children,
  linkBook,
  onClickCallback,
}: InputProps) {
  let path = "/link-book";
  if (isNormalLinkBook(linkBook) && linkBook.linkBookId) {
    path += `/${encodeForUrlPath(linkBook.title)}`;
  }

  const handleClick = () => {
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
