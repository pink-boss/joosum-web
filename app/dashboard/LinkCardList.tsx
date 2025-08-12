"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState, useRef } from "react";

import EmptyLinks from "@/components/EmptyLinks";
import LoadMoreButton from "@/components/link/link-list/LoadMoreButton";
import useQueryAllLinks from "@/hooks/link/useQueryAllLinks";
import { usePaginationWithDeps } from "@/hooks/usePaginationWithDeps";
import { defaultValues } from "@/store/link-filter/schema";
import { useFolderLinkFilterStore } from "@/store/link-filter/useFolderStore";

import LinkCard from "./LinkCard";
import { sendGTMEvent } from "@next/third-parties/google";

export default function LinkCardList() {
  const [filter, setFilter] = useState<"latest" | "unread">("latest");
  const { setUnread } = useFolderLinkFilterStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const linkFilter = {
    ...defaultValues,
    unread: filter === "unread",
  };
  const linkSort = {
    field: "lastest" as const,
    sort: "created_at" as const,
    order: "desc" as const,
  };

  const {
    isPending,
    error,
    data = [],
  } = useQueryAllLinks({
    linkFilter,
    linkSort,
  });

  const { currentItems, hasNextPage, loadNextPage, totalItems } =
    usePaginationWithDeps({
      items: data,
      itemsPerPage: 30,
      additionalDeps: [filter], // filter 변경 시 페이징 리셋
      scrollTargetRef: scrollContainerRef,
    });

  const handleFilter = (e: any) => {
    sendGTMEvent({
      event: "click.tab_home",
    });
    setFilter(e.target.value);
  };

  const handleLinkToAllLinks = () => {
    sendGTMEvent({
      event: "click.viewAll_home",
    });
    if (filter === "unread") {
      setUnread(true);
    }
  };

  const onClickLoadMore = () => {
    sendGTMEvent({
      event: "click.more_home",
    });
    loadNextPage();
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <form className="flex gap-6 text-gray-dim" onChange={handleFilter}>
          <div className="flex gap-2">
            <input
              type="radio"
              name="filter"
              id="filter-latest"
              value="latest"
              defaultChecked
              className="size-6 accent-primary-500"
            />
            <label htmlFor="filter-latest">최근 저장</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="filter"
              id="filter-unread"
              value="unread"
              className="size-6 accent-primary-500"
            />
            <label htmlFor="filter-unread">읽지 않음</label>
          </div>
        </form>
        <NextLink href="/link-book" onClick={handleLinkToAllLinks}>
          <div className="flex gap-1 pl-5">
            <span className="text-lg font-semibold">전체보기</span>
            <Image
              src="/icons/icon-right-black.png"
              alt="right"
              width={24}
              height={24}
            />
          </div>
        </NextLink>
      </div>
      {data.length ? (
        <div
          ref={scrollContainerRef}
          className="flex flex-col items-start gap-8 overflow-auto"
        >
          <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-5">
            {currentItems.map((link, index) => (
              <LinkCard key={index} link={link} index={index} />
            ))}
          </div>
          {hasNextPage && (
            <LoadMoreButton
              onClick={onClickLoadMore}
              remainingCount={totalItems - currentItems.length}
              textPrefix={filter === "latest" ? "저장한" : "읽지 않은"}
              variant="card"
            />
          )}
        </div>
      ) : (
        <EmptyLinks unread={filter === "unread"} />
      )}
    </div>
  );
}
