import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { MutateLinkDrawer, SaveLinkDrawer, UserDrawer } from "./dynamic";

export default function DynamicOpenDrawers() {
  const { isLinkDrawerOpen, isUserDrawerOpen } = useOpenDrawerStore();

  return (
    <>
      {isLinkDrawerOpen && (
        <>
          <MutateLinkDrawer />
          <SaveLinkDrawer />
        </>
      )}
      {isUserDrawerOpen && <UserDrawer />}
    </>
  );
}
