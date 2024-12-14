"use client";

import LinkList from "./LinkList";
import Filter from "./Filter";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useParams } from "next/navigation";

export default function FolderDetail() {
  const { title } = useParams<{ title: string }>();
  const { linkBook } = useSelectLinkBook(title);

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
