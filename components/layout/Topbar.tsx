import OpenUserDrawerButton from "../drawer/user/OpenDrawerButton";
import OpenLinkSaveDrawerButton from "../drawer/link/OpenSaveDrawerButton";
import SearchInput from "./SearchInput";

export default function Topbar() {
  return (
    <div className="mb-8 flex h-[104px] w-full items-center justify-between border bg-paperabovebg px-10 py-7">
      <SearchInput />
      <div className="flex gap-[20px]">
        <OpenLinkSaveDrawerButton />
        <OpenUserDrawerButton />
      </div>
    </div>
  );
}
