import { Link } from "@/types/link.types";
import { create } from "zustand";

interface CheckLinkState {
  links: Set<Link["linkId"]>;
  setLinks: (links?: Link["linkId"][]) => void;
  clearLinks: () => void;
}

export const useCheckLinkStore = create<CheckLinkState>()((set) => ({
  links: new Set([]),
  setLinks: (links) => set({ links: new Set(links ?? []) }),
  clearLinks: () => set({ links: new Set([]) }),
}));
