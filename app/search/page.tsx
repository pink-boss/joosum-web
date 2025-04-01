"use client";

import { useSearchBarStore } from "@/store/useSearchBarStore";
import Filter from "../link-book/[title]/Filter";
import LinkList from "../link-book/[title]/LinkList";
import LinkBookFilter from "./filter/LinkBook";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import {
  defaultValues,
  useSearchLinkFilterStore,
} from "@/store/link-filter/useSearchStore";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";

export default function Search() {
  const { title } = useSearchBarStore();

  const linkFilter = useSearchLinkFilterStore();
  const linkSort = useSearchLinkSortStore();
  const { isPending, error, data } = useQueryLinkBooks(linkSort.sort);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        '{title}' 검색 결과
      </div>
      <LinkBookFilter linkBookList={data?.linkBooks ?? []} />
      <Filter defaultValues={defaultValues} {...linkFilter} />
      <LinkList linkSort={linkSort} unread={linkFilter.unread} />
    </div>
  );
}
// TODO: LinkList 컴포넌트를 기능 단위로 나누어 리팩토링
// TODO: Search Page 테스트
