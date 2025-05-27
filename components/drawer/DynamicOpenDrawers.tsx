import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { MutateLinkDrawer, SaveLinkDrawer, UserDrawer } from "./dynamic";

export default function DynamicOpenDrawers() {
  const { isLinkDrawerOpen, isLinkSaveDrawerOpen, isUserDrawerOpen } =
    useOpenDrawerStore();

  return (
    <>
      {isLinkDrawerOpen && <MutateLinkDrawer />}
      {isLinkSaveDrawerOpen && <SaveLinkDrawer />}
      {isUserDrawerOpen && <UserDrawer />}
    </>
  );
}
