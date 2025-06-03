import clsx from "clsx";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function OpenLinkSaveDrawerButton() {
  const { openLinkDrawer } = useOpenDrawerStore();
  const handleClick = () => {
    openLinkDrawer(true, "save");
  };
  return (
    <button
      className={clsx(
        "h-[48px] w-auto rounded-xl bg-black font-bold text-white",
        "min-w-[120px] px-4 text-sm",
        "sm:min-w-[160px] sm:text-lg",
        "lg:min-w-[200px] lg:text-xl",
      )}
      onClick={handleClick}
    >
      <span className="sm:inline hidden">링크 저장</span>
      <span className="sm:hidden">저장</span>
    </button>
  );
}
