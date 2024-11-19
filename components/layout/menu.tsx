import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import clsx from "clsx";

interface LinkBook {
  linkBookId: string;
  title: string;
  backgroundColor: string;
  titleColor: string;
  illustration: null | string;
  createdAt: string;
  lastSavedAt: string;
  userId: string;
  linkCount: number;
  isDefault: "y" | "n";
}

interface TQueryLinkBooks {
  linkBooks: LinkBook[];
  totalLinkCount: number;
}

export default function Menu() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const { isPending, error, data } = useQuery<TQueryLinkBooks>({
    queryKey: ["linkBooks"],
    queryFn: () =>
      fetch(`/my-folder/api`, {
        method: "GET",
      }).then((res) => res.json()),
  });
  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-4 px-10 py-3"
        onClick={() => router.push("/home")}
      >
        <Image src="/icons/home.png" width={24} height={24} alt="home" />
        <div className="text-lg font-bold">홈</div>
      </div>
      <div
        className="flex cursor-pointer items-center gap-4 px-10 py-3"
        onClick={() => router.push("/my-folder")}
      >
        <Image
          src="/icons/icon-folder.png"
          width={24}
          height={24}
          alt="folder"
        />
        <div className="text-lg font-bold">내 폴더</div>
        <div className="ml-auto">
          <Image src="/icons/icon-down.png" width={24} height={24} alt="down" />
        </div>
      </div>
      {data?.linkBooks
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .map((prop, index) => (
          <div
            key={index}
            className={clsx(
              "h-[48px] w-[282px] py-3 pl-12 pr-5",
              `bg-[${prop.backgroundColor}]`,
            )}
          >
            <div className="flex gap-2">
              <div
                className={clsx(
                  "h-5 w-5 rounded-full border border-white",
                  `bg-${prop.backgroundColor}`,
                )}
              ></div>
              <div className="font-semibold text-[#444444]">{prop.title}</div>
            </div>
          </div>
        ))}
      <div
        className="flex cursor-pointer items-center justify-center gap-1 bg-white py-3"
        onClick={() => {}}
      >
        <Image src="/icons/icon-plus.png" width={28} height={28} alt="plus" />
        <div className="font-semibold text-[#444444]">폴더 만들기</div>
      </div>
    </div>
  );
}
