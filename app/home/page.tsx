"use client";

import LinkCardList from "./LinkCardList";
import { Banner } from "../../types/banner.types";
import BannerCard from "./Banner";
import { useSearchLinkStore } from "@/store/useSearchLinkStore";
import { useQueryLinks } from "@/hooks/link/useQueryLinks";

type TQueryBanners = Banner[];

export default function Home() {
  const { sort, order, search } = useSearchLinkStore();
  // TODO: 폴더리스트의 필터가 영향을 안주는지 확인 - 별개의 상태 관리 필요
  const { isPending, error, data = [] } = useQueryLinks();

  // const bannerData = useQuery<TQueryBanners>({
  //   queryKey: ["banners"],
  //   queryFn: () =>
  //     fetch(`/api/banners`, {
  //       method: "GET",
  //     }).then((res) => res.json()),
  // });
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-12 px-10">
      <BannerCard data={[]} />
      <LinkCardList links={data} />
    </div>
  );
}
