import BannerCard from "./Banner";
import LinkCardList from "./LinkCardList";

export default function Home() {
  // const bannerData = useQuery<TQueryBanners>({
  //   queryKey: ["banners"],
  //   queryFn: () =>
  //     fetch(`/api/banners`, {
  //       method: "GET",
  //     }).then((res) => res.json()),
  // });
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-12 px-10 pb-8">
      <BannerCard data={[]} />
      <LinkCardList />
    </div>
  );
}
