"use client";

import LinkList from "./link-list";
import Filter from "./filter";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";

export default function FolderDetail() {
  const { linkBook } = useSelectLinkBookStore();
  return (
    <div className="flex w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-[#2F2F2F]">
        {linkBook?.title}
      </div>
      <Filter />
      <LinkList />
    </div>
  );
}
