"use client";

import Image from "next/image";
import LinkCard from "./LinkCard";
import { useState } from "react";
import NextLink from "next/link";
import EmptyLinks from "@/components/EmptyLinks";
import { Link } from "@/types/link.types";

type InputProps = {
  links: Link[];
};

export default function LinkCardList({ links }: InputProps) {
  const [isAllLinks, setIsAllLinks] = useState(false);
  const [filter, setFilter] = useState<"latest" | "unread">("latest");
  const handleFilter = (e: any) => {
    setFilter(e.target.value);
  };
  const filteredLinks =
    filter === "unread" ? links.filter(({ readCount }) => !readCount) : links;

  return (
    <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <form
          className="flex gap-6 text-text-secondary"
          onChange={handleFilter}
        >
          <div className="flex gap-2">
            <input
              type="radio"
              name="filter"
              id="filter-latest"
              value="latest"
              defaultChecked
              className="h-6 w-6 accent-primary"
            />
            <label htmlFor="filter-latest">최근 저장</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="filter"
              id="filter-unread"
              value="unread"
              className="h-6 w-6 accent-primary"
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
      {filteredLinks.length ? (
        <div className="flex flex-col items-center gap-8 overflow-auto">
          <div className="grid grid-cols-4 gap-8 overflow-auto">
            {filteredLinks
              .slice(0, isAllLinks ? undefined : 29)
              .map((link, index) => (
                <LinkCard key={index} link={link} />
              ))}
          </div>
          {filteredLinks.length > 30 && (
            <div
              className="flex cursor-pointer rounded-lg py-4"
              onClick={() => setIsAllLinks(true)}
            >
              <span className="text-lg font-bold text-text-secondary">
                {filter === "latest" ? "저장한" : "읽지 않은"} 링크{" "}
                {filteredLinks.length - 30 > 999
                  ? "999+"
                  : filteredLinks.length - 30}
                개 모두 보기
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
