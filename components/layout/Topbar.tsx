import clsx from "clsx";

import useSearchBarReset from "@/hooks/useSearchBarReset";

import SearchInput from "./SearchInput";
import OpenLinkSaveDrawerButton from "../drawer/link/OpenSaveDrawerButton";
import OpenUserDrawerButton from "../drawer/user/OpenDrawerButton";

export default function Topbar() {
  // '/search' 페이지가 아니면 검색어 초기화
  useSearchBarReset();

  return (
    <div
      className={clsx(
        "mb-8 flex h-[104px] w-full items-center justify-between bg-paperabovebg py-7",
        "gap-6 px-10",

        "lg:gap-12",
      )}
    >
      <div className="min-w-0 flex-1">
        <SearchInput />
      </div>
      <div
        className={clsx("flex flex-none", "gap-3", "sm:gap-4", "lg:gap-[20px]")}
      >
        <OpenLinkSaveDrawerButton />
        <OpenUserDrawerButton />
      </div>
    </div>
  );
}
