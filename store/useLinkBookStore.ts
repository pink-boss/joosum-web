import { LinkBook } from "@/types/linkBook.types";
import { create } from "zustand";

interface SelectLinkBookState {
  linkBook: LinkBook | undefined;
  selectLinkBook: (linkBook: LinkBook | undefined) => void;
}

export const useSelectLinkBookStore = create<SelectLinkBookState>()((set) => ({
  linkBook: undefined,
  selectLinkBook: (linkBook) => set({ linkBook }),
}));
