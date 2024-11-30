import { create } from "zustand";

interface OpenDialogState {
  createFolderDialog: boolean;
  openCreateFolderDialog: (value: boolean) => void;
}

export const useOpenDialogStore = create<OpenDialogState>()((set) => ({
  createFolderDialog: false,
  openCreateFolderDialog: (value) => set({ createFolderDialog: value }),
}));
