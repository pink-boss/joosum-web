import { LinkBook } from "@/app/my-folder/type";
import { create } from "zustand";

interface SelectLinkBookState {
  linkBook: LinkBook | undefined;
  selectLinkBook: (linkBook: LinkBook | undefined) => void;
}

export const useSelectLinkBookStore = create<SelectLinkBookState>()((set) => ({
  linkBook: undefined,
  selectLinkBook: (linkBook) => set({ linkBook }),
}));
