import { create } from 'zustand';

interface SubDialogState {
  key: string | undefined;

  // tag
  isDeleteTagConfirmOpen: boolean;
  openDeleteTagConfirm: (isOpen: boolean) => void;
}

export const useSubDialogStore = create<SubDialogState>()((set) => ({
  key: undefined,

  // tag
  isDeleteTagConfirmOpen: false,
  openDeleteTagConfirm: (isOpen) => set({ isDeleteTagConfirmOpen: isOpen }),
}));
