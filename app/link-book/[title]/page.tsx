"use client";

import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";
import { useFolderLinkSortStore } from "@/store/link-sort/useFolderStore";

import Filter from "./Filter";
import LinkList from "./link-list/LinkList";

export default function FolderDetail() {
  const linkBook = useLinkBookFromTitle();
  const linkFilter = useFolderLinkFilterStore();
  const linkSort = useFolderLinkSortStore();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10 pb-8">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        {linkBook ? linkBook.title : "전체"}
      </div>
      <Filter defaultValues={defaultValues} {...linkFilter} />
      <LinkList
        linkSort={linkSort}
        linkFilter={linkFilter}
        linkBookId={linkBook?.linkBookId}
      />
    </div>
  );
}
