"use client";

import LinkList from "./LinkList";
import Filter from "./Filter";
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";

export default function FolderDetail() {
  const linkBook = useLinkBookFromTitle();

  return (
    <div className="flex w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-[#2F2F2F]">
        {linkBook ? linkBook.title : "전체"}
      </div>
      <Filter />
      <LinkList />
    </div>
  );
}
