"use client";

import DropdownSort, { sortOptions } from "./dropdown/sort";
import CreateButton from "./mutate/button";
import LinkBookList from "./link-book-list";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "@/components/loading";

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
        <DropdownSort selected={sortOption} setSelected={setSortOption} />
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
