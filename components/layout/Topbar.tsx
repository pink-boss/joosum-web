import clsx from "clsx";

import SearchInput from "./SearchInput";
import OpenLinkSaveDrawerButton from "../drawer/link/OpenSaveDrawerButton";
import OpenUserDrawerButton from "../drawer/user/OpenDrawerButton";

export default function Topbar() {
  return (
    <div
      className={clsx(
        "mb-8 flex h-[104px] w-full items-center justify-between bg-paperabovebg py-7",
        "gap-4 px-4",
        "sm:gap-6 sm:px-6",
        "lg:gap-12 lg:px-10",
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
