import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import clsx from "clsx";
import Loading from "../loading";
import Link from "next/link";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useLayoutStore } from "@/store/useLayoutStore";
import { MouseEvent } from "react";
import LinkToPage from "../link-book/LinkToPage";

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
  closeDialog: () => void;
};

function LinkBookMenu({ linkBook, closeDialog }: LinkBookMenuProps) {
  return (
    <LinkToPage linkBook={linkBook} onClickCallback={closeDialog}>
      <div className={clsx("h-[48px] py-3 pl-12 pr-5")}>
        <div className="flex gap-2">
          <div
            className={clsx("h-5 w-5 rounded-full border border-white")}
            style={{ backgroundColor: linkBook.backgroundColor }}
          />
          <div className="font-semibold text-[#444444]">{linkBook.title}</div>
        </div>
      </div>
    </LinkToPage>
  );
}

export default function Menu() {
  const { isPending, error, data } = useQuery<TQueryLinkBooks>({
    queryKey: ["linkBooks"],
    queryFn: () =>
      fetch(`/my-folder/api`, {
        method: "GET",
      }).then((res) => res.json()),
  });
  const { openMutateFolder } = useOpenDialogStore();
  const { selectLinkBook } = useSelectLinkBookStore();
  const { openSideMenu, setOpenSideMenu } = useLayoutStore();

  const closeDialog = () => {
    openMutateFolder(false);
  };

  const handleCreateFolder = () => {
    selectLinkBook(undefined);
    openMutateFolder(true);
  };

  const handleOpenMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpenSideMenu(!openSideMenu);
  };

  const linkBooks = error ? [] : data?.linkBooks;

  return (
    <div className="w-[282px]">
      <Link href="/home" onClick={closeDialog}>
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
          <div className="ml-auto" onClick={handleOpenMenu}>
            <Image
              src={`/icons/icon-down.png`}
              width={24}
              height={24}
              alt="icon-direction"
              className={clsx(
                "transition-transform duration-300",
                !openSideMenu && "rotate-180",
              )}
            />
          </div>
        </div>
      </Link>
      {isPending && openSideMenu ? (
        <Loading />
      ) : (
        <div
          className={clsx(
            openSideMenu
              ? "mini-scroll max-h-[50vh] overflow-y-auto overflow-x-hidden"
              : "h-0 overflow-hidden",
          )}
        >
          {linkBooks?.map((linkBook, index) => (
            <LinkBookMenu
              linkBook={linkBook}
              key={index}
              closeDialog={closeDialog}
            />
          ))}
        </div>
      )}
      <div
        className="flex cursor-pointer items-center justify-center gap-1 bg-white py-3"
        onClick={handleCreateFolder}
      >
        <Image src="/icons/icon-plus.png" width={28} height={28} alt="plus" />
        <div className="font-semibold text-[#444444]">폴더 만들기</div>
      </div>
    </div>
  );
}
