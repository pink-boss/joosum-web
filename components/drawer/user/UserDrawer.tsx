import clsx from "clsx";
import Image from "next/image";

import Drawer from "@/components/Drawer";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import Support from "./Support";
import Setting from "./Setting";
import Account from "./Account";

export default function UserDrawer() {
  const { isUserDrawerOpen: isOpen, openUserDrawer: open } =
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
        <div className={clsx("flex flex-col gap-5", "text-lg text-gray-dim")}>
          <Account />
          <Setting />
          <div className={clsx("border-t border-gray-silver")} />

          <Support />
          <div className={clsx("border-t border-gray-silver")} />

          <div className="flex justify-between px-10 font-semibold">
            <span>로그아웃</span>
            <Image
              src="/icons/icon-exit.png"
              alt="exit"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
