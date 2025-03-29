import { create } from "zustand";

interface LinkInputState {
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
}

export const useLinkInputStore = create<LinkInputState>()((set) => ({
  isValid: false,
  setIsValid: (isValid) => set({ isValid }),
}));
