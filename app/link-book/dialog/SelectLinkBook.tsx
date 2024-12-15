"use client";

import { useClearDropdown } from "@/hooks/useClearDropdown";
import clsx from "clsx";
import { useState } from "react";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import Image from "next/image";
import { LinkBook, LinkBookIdParam } from "@/types/linkBook.types";
import { useParams } from "next/navigation";

export type InputProps = {
  open?: boolean;
  selected: LinkBook | null;
  setSelected: (linkBook: LinkBook) => void;
};

export default function SelectLinkBook({
  open,
  selected,
  setSelected,
}: InputProps) {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const { linkBookId: fromLinkBookId } = useParams<LinkBookIdParam>();
  const { data } = useQueryLinkBooks("created_at");

  const linkBooks = data?.linkBooks.filter(
    (linkBook) => linkBook.linkBookId !== fromLinkBookId,
  );

  const handleClick = (newLinkBook: LinkBook) => {
    setSelected(newLinkBook);
    setIsOpen(false);
  };

  return (
    <div className="relative" data-testid="link-book-selector" ref={ref}>
      <button
        data-testid="open-button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center justify-between gap-0.5 px-3 text-sm text-text-secondary",
          "h-[46px] w-[305px] rounded-lg border border-[#BBBBBB]",
        )}
      >
        <span className="text-single-line w-64">{selected?.title}</span>
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
            {linkBooks?.map((linkBook) => (
              <button
                key={`reassign-to-${linkBook.title}`}
                className="text-single-line py-2 text-start text-sm"
                onClick={() => handleClick(linkBook)}
              >
                {linkBook.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
