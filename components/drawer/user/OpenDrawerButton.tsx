import Image from "next/image";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function OpenUserDrawerButton() {
  const { openUserDrawer } = useOpenDrawerStore();

  return (
    <button data-testid="user-drawer-open" onClick={() => openUserDrawer(true)}>
      <Image src="/icons/user.png" alt="user" width={48} height={48} />
    </button>
  );
}
