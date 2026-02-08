import { DashboardBanner, DashboardLinkCardList } from './components';

// 홈 화면
export default function Dashboard() {
  // const bannerData = useQuery<TQueryBanners>({
  //   queryKey: ["banners"],
  //   queryFn: () =>
  //     fetch(`/api/banners`, {
  //       method: "GET",
  //     }).then((res) => res.json()),
  // });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-12 px-10 pb-8">
      <DashboardBanner />
      <DashboardLinkCardList />
    </div>
  );
}
