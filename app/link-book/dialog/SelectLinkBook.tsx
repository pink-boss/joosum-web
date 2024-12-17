"use client";

import { useClearDropdown } from "@/hooks/useClearDropdown";
import clsx from "clsx";
import { useMemo, useState } from "react";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import Image from "next/image";
import { LinkBook } from "@/types/linkBook.types";

export type InputProps = {
  open?: boolean;
  linkBookId?: LinkBook["linkBookId"];
  setLinkBookId: (
    linkBookName: LinkBook["title"],
    linkBookId: LinkBook["linkBookId"],
  ) => void;
  fromLinkBookId?: string;
  className?: string;
};

export default function SelectLinkBook({
  open,
  linkBookId,
  setLinkBookId,
  fromLinkBookId,
  className,
}: InputProps) {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const { data } = useQueryLinkBooks("created_at");

  const linkBookOptions: OptionItem<string>[] = useMemo(() => {
    const linkBooks = fromLinkBookId
      ? data?.linkBooks.filter(
          (linkBook) => linkBook.linkBookId !== fromLinkBookId,
        )
      : data?.linkBooks;

    return linkBooks
      ? linkBooks.map((linkBook) => ({
          label: linkBook.title,
          value: linkBook.linkBookId,
        }))
      : [];
  }, [data?.linkBooks, fromLinkBookId]);

  const handleClick = (
    newLinkBookName: LinkBook["title"],
    newLinkBookId: LinkBook["linkBookId"],
  ) => {
    setLinkBookId(newLinkBookName, newLinkBookId);
    setIsOpen(false);
  };

  return (
    <div className="relative" data-testid="link-book-selector" ref={ref}>
      <button
        data-testid="open-button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center justify-between gap-0.5 px-3 text-start text-sm text-text-secondary",
          "h-[46px] w-full rounded-lg border border-[#BBBBBB]",
          className && className,
        )}
      >
        <span className="text-single-line w-64">
          {linkBookOptions?.find(({ value }) => value === linkBookId)?.label}
        </span>
        <Image src="/icons/icon-down3.png" alt="down" width={20} height={20} />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 flex max-w-min flex-col",
            "gap-[20px] rounded-lg border border-background-secondary bg-white p-6 shadow-lg",
          )}
        >
          <div className="mini-scroll flex h-[222px] w-[258px] flex-col gap-1 overflow-auto border border-background-secondary p-3">
            {linkBookOptions?.map(({ label, value }) => (
              <button
                key={`reassign-to-${label}`}
                className="text-single-line py-2 text-start text-sm"
                onClick={() => handleClick(label, value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
