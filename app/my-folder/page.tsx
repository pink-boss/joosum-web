"use client";

import CreateButton from "./CreateDialogButton";
import LinkBookList from "./LinkBookList";
import Loading from "@/components/Loading";
import Dropdown from "@/components/Dropdown";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useLinkBookSortStore } from "@/store/useLinkBookSortStore";
import { sortOptions } from "./constants";

// TODO: api 이동
// TODO: 테스트
// TODO: 고도화 적용 - 폴더 컬러, 타이틀 글자 수
export default function MyFolder() {
  const { isPending, error, data } = useQueryLinkBooks("linkBook");
  const { sort, setSort } = useLinkBookSortStore();
  return (
    <div className="flex w-full flex-1 flex-col gap-8 overflow-hidden px-10">
      <div className="flex items-center justify-end gap-3">
        <Dropdown selected={sort} setSelected={setSort} options={sortOptions} />
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
