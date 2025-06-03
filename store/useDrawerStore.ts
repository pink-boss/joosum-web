import { create } from "zustand";

import { Link } from "@/types/link.types";

type LinkDrawerInputState =
  | { isLinkDrawerOpen: false; link: undefined; mode: undefined }
  | { isLinkDrawerOpen: true; link: Link; mode: "mutate" }
  | { isLinkDrawerOpen: true; link: Link | undefined; mode: "save" };

type LinkDrawerState = LinkDrawerInputState & {
  openLinkDrawer: {
    (isOpen: true, mode: "mutate", link: Link): void;
    (isOpen: true, mode: "save", link?: Link): void;
    (isOpen: false): void;
  };
};

type UserDrawerState = {
  isUserDrawerOpen: boolean;
  openUserDrawer: (isOpen: boolean) => void;
};

type DrawerState = LinkDrawerState & UserDrawerState;

export const useOpenDrawerStore = create<DrawerState>()((set) => ({
  // 통합 링크 drawer
  isLinkDrawerOpen: false,
  link: undefined,
  mode: undefined,
  openLinkDrawer: ((isOpen: boolean, mode?: "mutate" | "save", link?: Link) => {
    if (isOpen && mode === "mutate" && !link) {
      throw new Error("Link must be provided when opening mutate mode");
    }
    set({
      isLinkDrawerOpen: isOpen,
      mode: isOpen ? mode : undefined,
      link: isOpen ? link : undefined,
    } as LinkDrawerState);
  }) as LinkDrawerState["openLinkDrawer"],

  // 내정보 drawer
  isUserDrawerOpen: false,
  openUserDrawer: (isOpen: boolean) => set({ isUserDrawerOpen: isOpen }),
}));
