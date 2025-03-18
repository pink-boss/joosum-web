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

type UserDrawerState = {
  isUserDrawerOpen: boolean;
  openUserDrawer: (isOpen: boolean) => void;
};

type Drawerstate = LinkDrawerState & UserDrawerState;

export const useOpenDrawerStore = create<Drawerstate>()((set) => ({
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

  isUserDrawerOpen: false,
  openUserDrawer: (isOpen) => set({ isUserDrawerOpen: isOpen }),
}));
