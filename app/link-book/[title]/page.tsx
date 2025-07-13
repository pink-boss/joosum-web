"use client";

import Loading from "@/components/Loading";
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";

import LinkList from "./LinkList";
import Filter from "../../../components/link/Filter";

export default function FolderDetail() {
  const linkBook = useLinkBookFromTitle();
  const linkFilter = useFolderLinkFilterStore();
  const { title } = useSearchBarStore();

  return !title ? (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10 pb-8">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        {linkBook ? linkBook.title : "전체"}
      </div>
      <Filter defaultValues={defaultValues} {...linkFilter} />
      <LinkList linkFilter={linkFilter} linkBookId={linkBook?.linkBookId} />
    </div>
  ) : (
    <Loading />
  );
}
