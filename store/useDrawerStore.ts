import { create } from "zustand";

import { Link } from "@/types/link.types";

type LinkDrawerInputState =
  | { isLinkDrawerOpen: false; link: undefined }
  | { isLinkDrawerOpen: true; link: Link };

type LinkDrawerState = LinkDrawerInputState & {
  openLinkDrawer: {
    (isOpen: true, link: Link): void;
    (isOpen: false): void;
  };
};

type LinkSaveDrawerState = {
  isLinkSaveDrawerOpen: boolean;
  openLinkSaveDrawer: (isOpen: boolean) => void;
};

type UserDrawerState = {
  isUserDrawerOpen: boolean;
  openUserDrawer: (isOpen: boolean) => void;
};

type Drawerstate = LinkDrawerState & LinkSaveDrawerState & UserDrawerState;

export const useOpenDrawerStore = create<Drawerstate>()((set) => ({
  // 링크 상세정보
  isLinkDrawerOpen: false,
  link: undefined,

  openLinkDrawer: ((isOpen, link) => {
    if (isOpen && !link) {
      throw new Error("Link must be provided when opening drawer");
    }
    set({
      isLinkDrawerOpen: isOpen,
      link: isOpen ? link : undefined,
    } as LinkDrawerState);
  }) as LinkDrawerState["openLinkDrawer"],

  // 링크 저장
  isLinkSaveDrawerOpen: false,
  openLinkSaveDrawer: (isOpen) => set({ isLinkSaveDrawerOpen: isOpen }),

  // 내정보
  isUserDrawerOpen: false,
  openUserDrawer: (isOpen) => set({ isUserDrawerOpen: isOpen }),
}));
