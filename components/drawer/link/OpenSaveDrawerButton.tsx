import clsx from "clsx";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { sendGTMEvent } from "@next/third-parties/google";

export default function OpenLinkSaveDrawerButton() {
  const { openLinkDrawer } = useOpenDrawerStore();
  const handleClick = () => {
    sendGTMEvent({ event: "click.saveLink_topNavi_common" });
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
      <span className="inline">링크 저장</span>
    </button>
  );
}
