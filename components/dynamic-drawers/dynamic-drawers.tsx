import { useDrawerStore } from '@/libs/zustand/store';

import { LinkMutateDrawer, LinkSaveDrawer, UserDrawer } from './dynamic';

export default function DynamicDrawers() {
  const { isLinkDrawerOpen, isUserDrawerOpen } = useDrawerStore();

  return (
    <>
      {isLinkDrawerOpen && (
        <>
          <LinkMutateDrawer />
          <LinkSaveDrawer />
        </>
      )}
      {isUserDrawerOpen && <UserDrawer />}
    </>
  );
}
