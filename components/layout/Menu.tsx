import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

import DropdownMore from "@/app/my-folder/DropdownMore";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useLayoutStore } from "@/store/useLayoutStore";
import { LinkBook } from "@/types/linkBook.types";

import LinkToPage from "../link-book/LinkToPage";
import Loading from "../Loading";

type LinkBookMenuProps = {
  linkBook: LinkBook;
  closeDialog: () => void;
};

function LinkBookMenu({ linkBook, closeDialog }: LinkBookMenuProps) {
  return (
    <LinkToPage linkBook={linkBook} onClickCallback={closeDialog}>
      <div className={clsx("h-[48px] py-3 pl-12 pr-5")}>
        <div className="relative flex items-center gap-2">
          <div
            className={clsx("size-5 rounded-full border border-white")}
            style={{ backgroundColor: linkBook.backgroundColor }}
          />
          <div className="w-36 truncate font-semibold text-gray-graphite">
            {linkBook.title}
          </div>
          {linkBook.isDefault !== "y" && (
            <div
              className="absolute right-0"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMore linkBook={linkBook} isLayout />
            </div>
          )}
        </div>
      </div>
    </LinkToPage>
  );
}

export default function Menu() {
  const { isPending, error, data } = useQueryLinkBooks("created_at");
  const { openMutateLinkBook } = useOpenDialogStore();
  const { clearLinkBook } = useSelectLinkBook();
  const { openSideMenu, setOpenSideMenu } = useLayoutStore();

  const closeDialog = () => {
    openMutateLinkBook(false);
  };

  const handleCreateFolder = () => {
    clearLinkBook();
    openMutateLinkBook(true);
  };

  const handleOpenMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <div className="w-[282px]">
      <Link href="/dashboard" onClick={closeDialog}>
        <div className="flex items-center gap-4 px-10 py-3">
          <Image
            src="/icons/home.svg"
            width={24}
            height={24}
            alt="home"
            unoptimized
          />
          <div className="text-lg font-bold text-gray-ink">홈</div>
        </div>
      </Link>
      <Link href="/my-folder">
        <div className="flex cursor-pointer items-center gap-4 px-10 py-3">
          <Image
            src="/icons/icon-folder.svg"
            width={24}
            height={24}
            alt="folder"
            unoptimized
          />
          <div className="text-lg font-bold text-gray-ink">내 폴더</div>
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
          <Link href="/link-book">
            <div
              className={clsx(
                "h-[48px] py-3 pl-12 pr-5",
                "flex items-center gap-2",
              )}
            >
              <div
                className={clsx("size-5 rounded-full border border-white")}
                style={{
                  backgroundColor: data?.linkBooks?.[0]?.backgroundColor,
                }}
              />
              <div className="w-36 truncate font-semibold text-gray-graphite">
                전체
              </div>
            </div>
          </Link>
          {data?.linkBooks?.map((linkBook, index) => (
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
        <div className="font-semibold text-gray-graphite">폴더 만들기</div>
      </div>
    </div>
  );
}
