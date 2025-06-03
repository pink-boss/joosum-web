import clsx from "clsx";
import Image from "next/image";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function OpenUserDrawerButton() {
  const { openUserDrawer } = useOpenDrawerStore();

  return (
    <button
      data-testid="user-drawer-open"
      onClick={() => openUserDrawer(true)}
      className={clsx(
        "flex cursor-pointer items-center justify-center",
        "transition-opacity hover:opacity-80",
      )}
    >
      <Image src="/icons/user.png" alt="user" width={48} height={48} />
    </button>
  );
}
