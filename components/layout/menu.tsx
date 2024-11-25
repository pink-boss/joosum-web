import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Loading from "../loading";
import Link from "next/link";

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

type LinkBookMenuProps = {
  linkBook: LinkBook;
};

function LinkBookMenu({ linkBook }: LinkBookMenuProps) {
  return (
    <Link href={`/my-folder/${linkBook.linkBookId}`}>
      <div
        className={clsx(
          "h-[48px] w-[282px] py-3 pl-12 pr-5",
          `bg-[${linkBook.backgroundColor}]`,
        )}
      >
        <div className="flex gap-2">
          <div
            className={clsx(
              "h-5 w-5 rounded-full border border-white",
              `bg-${linkBook.backgroundColor}`,
            )}
          ></div>
          <div className="font-semibold text-[#444444]">{linkBook.title}</div>
        </div>
      </div>
    </Link>
  );
}

interface TQueryLinkBooks {
  linkBooks: LinkBook[];
  totalLinkCount: number;
}

export default function Menu() {
  const router = useRouter();
  const { isPending, error, data } = useQuery<TQueryLinkBooks>({
    queryKey: ["linkBooks"],
    queryFn: () =>
      fetch(`/my-folder/api`, {
        method: "GET",
      }).then((res) => res.json()),
  });
  const linkBooks = error
    ? []
    : data?.linkBooks.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  return (
    <div>
      <Link href="/home">
        <div className="flex items-center gap-4 px-10 py-3">
          <Image src="/icons/home.png" width={24} height={24} alt="home" />
          <div className="text-lg font-bold">홈</div>
        </div>
      </Link>
      <Link href="/my-folder" legacyBehavior>
        <div className="flex cursor-pointer items-center gap-4 px-10 py-3">
          <Image
            src="/icons/icon-folder.png"
            width={24}
            height={24}
            alt="folder"
          />
          <div className="text-lg font-bold">내 폴더</div>
          <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/icons/icon-down.png"
              width={24}
              height={24}
              alt="down"
            />
          </div>
        </div>
      </Link>
      {isPending ? (
        <Loading />
      ) : (
        linkBooks?.map((linkBook, index) => (
          <LinkBookMenu linkBook={linkBook} key={index} />
        ))
      )}
      <div
        className="flex cursor-not-allowed items-center justify-center gap-1 bg-white py-3"
        onClick={() => {}}
      >
        <Image src="/icons/icon-plus.png" width={28} height={28} alt="plus" />
        <div className="font-semibold text-[#444444]">폴더 만들기</div>
      </div>
    </div>
  );
}
