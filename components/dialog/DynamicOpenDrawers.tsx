import { MutateLinkDrawer } from "@/app/link-book/drawer/dynamic";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { LinkSaveDrawer, UserDrawer } from "../drawer/dynamic";

export default function DynamicOpenDrawers() {
  const { isLinkDrawerOpen, isLinkSaveDrawerOpen, isUserDrawerOpen } =
    useOpenDrawerStore();

  return (
    <>
      {isLinkDrawerOpen && <MutateLinkDrawer />}
      {isLinkSaveDrawerOpen && <LinkSaveDrawer />}
      {isUserDrawerOpen && <UserDrawer />}
    </>
  );
}
