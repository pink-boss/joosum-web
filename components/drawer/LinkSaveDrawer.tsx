import clsx from "clsx";
import Image from "next/image";

import Drawer from "@/components/Drawer";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function LinkSaveDrawer() {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();

  const onClose = () => {
    open(false);
  };

  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-col gap-10">
        <button className="px-5 py-1" onClick={onClose}>
          <Image
            src="/icons/icon-right-double.png"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div
          className={clsx("flex flex-col gap-5", "text-lg text-gray-dim")}
        ></div>
      </div>
    </Drawer>
  );
}
