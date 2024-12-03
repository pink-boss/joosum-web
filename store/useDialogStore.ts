import { create } from "zustand";

interface OpenDialogState {
  mutateFolder: boolean;
  deleteFolder: boolean;
  openMutateFolder: (open: boolean) => void;
  openDeleteFolder: (open: boolean) => void;
}

export const useOpenDialogStore = create<OpenDialogState>()((set) => ({
  mutateFolder: false,
  deleteFolder: false,
  openMutateFolder: (mutateFolder) => set({ mutateFolder }),
  openDeleteFolder: (deleteFolder) => set({ deleteFolder }),
}));
