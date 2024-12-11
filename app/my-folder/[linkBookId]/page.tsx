"use client";

import Loading from "@/components/loading";
import LinkList from "./link-list";
import { useParams } from "next/navigation";
import Filter from "./filter";
import { useQuery } from "@tanstack/react-query";
import { LinkBookIdParam } from "../type";

export default function FolderDetail() {
  return (
    <div className="flex w-full flex-1 flex-col gap-[25px] overflow-hidden px-10">
      <div className="text-[32px] font-extrabold leading-10 text-[#2F2F2F]">
        전체
      </div>
      <Filter />
      <LinkList />
    </div>
  );
}
