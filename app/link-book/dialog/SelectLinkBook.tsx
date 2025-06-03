"use client";

import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useClearDropdown } from "@/hooks/useClearDropdown";
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
  disabled?: boolean;
};

export default function SelectLinkBook({
  open,
  linkBookId,
  setLinkBookId,
  fromLinkBookId,
  className,
  disabled,
}: InputProps) {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const { data } = useQueryLinkBooks("created_at");

  const linkBookOptions: OptionItem<string>[] = useMemo(() => {
    const linkBooks = fromLinkBookId
      ? data?.linkBooks?.filter(
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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center justify-between gap-0.5 px-3 text-start text-sm text-gray-dim",
          "h-[46px] w-full rounded-lg border border-gray-silver",
          className && className,
        )}
        disabled={disabled}
      >
        <span data-testid="selected" className="text-single-line w-64">
          {linkBookOptions?.find(({ value }) => value === linkBookId)?.label}
        </span>
        <Image src="/icons/icon-down3.png" alt="down" width={20} height={20} />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 max-h-[214px] w-full overflow-y-auto",
            "rounded-lg border border-gray-ghost bg-white p-6 shadow-lg",
          )}
        >
          <div className="mini-scroll h-full">
            <div role="list" className="flex flex-col gap-2 p-3">
              {linkBookOptions?.map(({ label, value }) => (
                <button
                  key={`reassign-to-${label}`}
                  role="listitem"
                  type="button"
                  className="text-single-line h-6 text-start"
                  onClick={() => handleClick(label, value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
