"use client";

import Dropdown from "@/components/Dropdown";
import Loading from "@/components/Loading";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useLinkBookSortStore } from "@/store/useLinkBookSortStore";

import { sortOptions } from "./constants";
import CreateButton from "./CreateDialogOpenButton";
import LinkBookList from "./LinkBookList";

// TODO: 테스트
export default function MyFolder() {
  const { sort, setSort } = useLinkBookSortStore();

  const { isPending, error, data } = useQueryLinkBooks(sort);
  return (
    <div className="flex w-full flex-1 flex-col gap-8 overflow-hidden px-10 pb-8">
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
