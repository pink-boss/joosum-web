import LinkCardList from "./LinkCardList";
import { Banner } from "../../types/banner.types";
import BannerCard from "./Banner";
import { useSearchLinkStore } from "@/store/useSearchLinkStore";

type TQueryBanners = Banner[];

export default function Home() {
  const { sort, order, search } = useSearchLinkStore();

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
      <LinkCardList />
    </div>
  );
}
