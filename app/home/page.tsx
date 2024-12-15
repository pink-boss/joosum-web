"use client";

import LinkCardList from "./LinkCardList";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "../../types/banner.types";
import BannerCard from "./Banner";
import { useSearchLinkStore } from "@/store/useSearchLinkStore";
import { Link } from "@/types/link.types";

type TQueryLinks = Link[];
type TQueryBanners = Banner[];

export default function Home() {
  const { sort, order, search } = useSearchLinkStore();
  const {
    isPending,
    error,
    data = [],
  } = useQuery<TQueryLinks>({
    queryKey: ["links"],
    queryFn: () =>
      fetch(
        `/api/links?sort=${sort}&order=${order}${search ? `&search=${search}` : ""}`,
        {
          method: "GET",
        },
      ).then((res) => res.json()),
  });

  const bannerData = useQuery<TQueryBanners>({
    queryKey: ["banners"],
    queryFn: () =>
      fetch(`/api/banners`, {
        method: "GET",
      }).then((res) => res.json()),
  });
  return (
    <div className="flex w-full flex-1 flex-col gap-12 px-10">
      <BannerCard data={bannerData.data ?? []} />
      <LinkCardList links={data} />
    </div>
  );
}
