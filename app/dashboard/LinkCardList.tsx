"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

import EmptyLinks from "@/components/EmptyLinks";
import useQueryAllLinks from "@/hooks/link/useQueryAllLinks";

import LinkCard from "./LinkCard";

export default function LinkCardList() {
  const [isAllLinks, setIsAllLinks] = useState(false);
  const [filter, setFilter] = useState<"latest" | "unread">("latest");

  const {
    isPending,
    error,
    data = [],
  } = useQueryAllLinks({
    linkFilter: { unread: filter === "unread", tags: [], dateRange: [] },
    linkSort: {
      field: "lastest",
      sort: "created_at",
      order: "desc",
    },
  });

  const handleFilter = (e: any) => {
    setIsAllLinks(false);
    setFilter(e.target.value);
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
        <NextLink href="/my-folder">
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
        <div className="flex flex-col items-start gap-8 overflow-auto">
          <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-5">
            {data.slice(0, isAllLinks ? undefined : 30).map((link, index) => (
              <LinkCard key={index} link={link} index={index} />
            ))}
          </div>
          {data.length > 30 && !isAllLinks && (
            <div
              className="flex cursor-pointer self-center rounded-lg py-4"
              onClick={() => setIsAllLinks(true)}
            >
              <span className="text-lg font-bold text-gray-dim">
                {filter === "latest" ? "저장한" : "읽지 않은"} 링크{" "}
                {data.length - 30 > 999 ? "999+" : data.length - 30}개 모두 보기
              </span>
              <Image
                src="/icons/icon-right.png"
                alt="right"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
      ) : (
        <EmptyLinks unread={filter === "unread"} />
      )}
    </div>
  );
}
