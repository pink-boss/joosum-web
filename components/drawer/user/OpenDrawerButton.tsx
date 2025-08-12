import clsx from "clsx";
import Image from "next/image";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { sendGTMEvent } from "@next/third-parties/google";

export default function OpenUserDrawerButton() {
  const { openUserDrawer } = useOpenDrawerStore();

  return (
    <button
      data-testid="user-drawer-open"
      onClick={() => {
        sendGTMEvent({ event: "click.user_gnb_common" });
        openUserDrawer(true);
      }}
      className={clsx(
        "flex cursor-pointer items-center justify-center",
        "transition-opacity hover:opacity-80",
      )}
    >
      <Image
        src="/icons/user.svg"
        alt="user"
        width={48}
        height={48}
        unoptimized
      />
    </button>
  );
}
