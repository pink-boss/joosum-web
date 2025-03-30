"use client";

import { useSearchBarStore } from "@/store/useSearchBarStore";
import Filter from "../link-book/[title]/Filter";
import LinkList from "../link-book/[title]/LinkList";
import LinkBookFilter from "./filter/LinkBook";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";

export default function Search() {
  const { title, setTitle } = useSearchBarStore();
  const { isPending, error, data } = useQueryLinkBooks("created_at");

  console.log(data?.linkBooks);
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        '{title}' 검색 결과
      </div>
      <LinkBookFilter linkBookList={data?.linkBooks ?? []} />
      <Filter />
      <LinkList />
    </div>
  );
}
