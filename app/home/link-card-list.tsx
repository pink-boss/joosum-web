"use client";

import Image from "next/image";
import { Link as LinkType } from "./type";
import LinkCard from "./link-card";
import { useState } from "react";
import Link from "next/link";

type InputProps = {
  links: LinkType[];
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
    <div className="flex flex-1 flex-col gap-8">
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
        <Link href="/my-folder">
          <div className="flex gap-1 pl-5">
            <span className="text-lg font-semibold">전체보기</span>
            <Image
              src="/icons/icon-right-black.png"
              alt="right"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </div>
      {filteredLinks.length ? (
        <div className="flex flex-col items-center gap-8">
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
        <div className="flex flex-1 flex-col items-center justify-center gap-[14.4px] text-center">
          {filter === "latest" ? (
            <>
              <Image
                src="/empty-links.svg"
                alt="empty-links"
                width={188.4}
                height={141.6}
              />
              <div className="text-lg text-text-secondary">
                <p>저장된 링크가 없어요.</p>
                <p>링크를 주섬주섬 담아보세요.</p>
              </div>
            </>
          ) : (
            <>
              <Image
                src="/read-links.png"
                alt="read-links"
                width={139.2}
                height={142.8}
              />
              <div className="text-lg text-text-secondary">
                <p>저장된 링크를 모두 다 읽었어요!</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
