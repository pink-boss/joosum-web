import { Link } from "@/types/link.types";
import { create } from "zustand";

type LinkDrawerState =
  | { isLinkDrawerOpen: false; link: undefined }
  | { isLinkDrawerOpen: true; link: Link };

type LinkDrawerStore = LinkDrawerState & {
  openLinkDrawer: {
    (isOpen: true, link: Link): void;
    (isOpen: false): void;
  };
};

export const useOpenDrawerStore = create<LinkDrawerStore>()((set) => ({
  isLinkDrawerOpen: false,
  link: undefined,

  openLinkDrawer: ((isOpen, link) => {
    if (isOpen && !link) {
      throw new Error("Link must be provided when opening drawer");
    }

    set({
      isLinkDrawerOpen: isOpen,
      link: isOpen ? link : undefined,
    } as LinkDrawerStore);
  }) as LinkDrawerStore["openLinkDrawer"],
}));
