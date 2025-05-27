import clsx from "clsx";
import Image from "next/image";

import Drawer from "@/components/drawer/Drawer";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

import Account from "./Account";
import Logout from "./Logout";
import Setting from "./Setting";
import Support from "./Support";

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
          <Logout />
        </div>
      </div>
    </Drawer>
  );
}
