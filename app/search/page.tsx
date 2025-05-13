"use client";

import {
  defaultValues,
  useSearchLinkFilterStore,
} from "@/store/link-filter/useSearchStore";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";

import LinkBookFilter from "./filter/LinkBook";
import Filter from "../link-book/[title]/Filter";
import LinkList from "../link-book/[title]/link-list/LinkList";

export default function Search() {
  const { title } = useSearchBarStore();
  const linkFilter = useSearchLinkFilterStore();
  const linkSort = useSearchLinkSortStore();
  const { linkBookId } = useSearchLinkFilterStore();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        {title ? `'${title}' ` : undefined}검색 결과
      </div>
      <LinkBookFilter />
      <Filter defaultValues={defaultValues} {...linkFilter} />
      <LinkList
        linkSort={linkSort}
        linkFilter={linkFilter}
        linkBookId={linkBookId}
      />
    </div>
  );
}
