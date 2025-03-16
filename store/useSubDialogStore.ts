import { create } from "zustand";

interface OpenSubDialogState {
  key: string | undefined;

  // tag
  isDeleteTagConfirmOpen: boolean;
  openDeleteTagConfirm: (isOpen: boolean) => void;
}

export const useOpenSubDialogStore = create<OpenSubDialogState>()((set) => ({
  key: undefined,

  // tag
  isDeleteTagConfirmOpen: false,
  openDeleteTagConfirm: (isOpen) => set({ isDeleteTagConfirmOpen: isOpen }),
}));
