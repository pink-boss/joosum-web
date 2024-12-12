"use client";

import CreateButton from "./CreateDialogButton";
import LinkBookList from "./LinkBookList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "@/components/Loading";
import Dropdown from "@/components/Dropdown";
import { TQueryLinkBooks } from "@/types/linkBook.types";

const sortOptions = [
  { label: "생성순", value: "created_at" },
  { label: "제목순", value: "title" },
  { label: "업데이트순", value: "last_saved_at" },
];

// TODO: api 이동
// TODO: 테스트
// TODO: 고도화 적용 - 폴더 컬러, 타이틀 글자 수
export default function MyFolder() {
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const { isPending, error, data } = useQuery<TQueryLinkBooks>({
    queryKey: ["linkBooks", sortOption],
    queryFn: () =>
      fetch(`/my-folder/api?sort=${sortOption}`, {
        method: "GET",
      }).then((res) => res.json()),
  });
  return (
    <div className="flex w-full flex-1 flex-col gap-8 overflow-hidden px-10">
      <div className="flex items-center justify-end gap-3">
        <Dropdown
          selected={sortOption}
          setSelected={setSortOption}
          options={sortOptions}
        />
        <CreateButton />
      </div>

      {isPending ? (
        <Loading />
      ) : (
        <LinkBookList
          linkBooks={data?.linkBooks ?? []}
          totalLinkCount={data?.totalLinkCount ?? 0}
        />
      )}
    </div>
  );
}
