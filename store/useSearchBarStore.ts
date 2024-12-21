import { create } from "zustand";

interface SearchBarState {
  // filter
  keyword?: string;
  isDropdownOpen: boolean;
  setKeyword: (keyword?: string) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

export const useSearchBarStore = create<SearchBarState>()((set) => ({
  keyword: undefined,
  isDropdownOpen: false,
  setKeyword: (keyword) => set({ keyword }),
  setIsDropdownOpen: (isOpen) => set({ isDropdownOpen: isOpen }),
}));
