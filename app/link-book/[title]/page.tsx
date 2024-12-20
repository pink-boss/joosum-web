"use client";

import LinkList from "./LinkList";
import Filter from "./Filter";
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";

export default function FolderDetail() {
  const linkBook = useLinkBookFromTitle();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-gray-ink text-[32px] font-extrabold leading-10">
        {linkBook ? linkBook.title : "전체"}
      </div>
      <Filter />
      <LinkList />
    </div>
  );
}
