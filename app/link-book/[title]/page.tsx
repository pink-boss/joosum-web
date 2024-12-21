"use client";

import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";

import Filter from "./Filter";
import LinkList from "./LinkList";

export default function FolderDetail() {
  const linkBook = useLinkBookFromTitle();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        {linkBook ? linkBook.title : "전체"}
      </div>
      <Filter />
      <LinkList />
    </div>
  );
}
