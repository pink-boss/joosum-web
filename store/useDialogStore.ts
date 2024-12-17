import { create } from "zustand";

interface OpenDialogState {
  key: string | undefined;

  // linkBook
  isMutateLinkBookOpen: boolean;
  isDeleteLinkBookOpen: boolean;
  openMutateLinkBook: (isOpen: boolean, key?: string) => void;
  openDeleteLinkBook: (isOpen: boolean, key?: string) => void;

  // link
  isDeleteLinkOpen: boolean;
  isReassignLinkBookOpen: boolean;
  isDeleteDrawerLinkOpen: boolean;
  openDeleteLink: (isOpen: boolean) => void;
  openReassignLinkBook: (isOpen: boolean) => void;
  openDeleteDrawerLink: (isOpen: boolean) => void;
}

export const useOpenDialogStore = create<OpenDialogState>()((set) => ({
  key: undefined,

  // linkBook
  isMutateLinkBookOpen: false,
  isDeleteLinkBookOpen: false,
  openMutateLinkBook: (isOpen, newKey) => {
    set({ isMutateLinkBookOpen: isOpen, key: isOpen ? newKey : undefined });
  },
  openDeleteLinkBook: (isOpen, newKey) => {
    set({ isDeleteLinkBookOpen: isOpen, key: isOpen ? newKey : undefined });
  },

  // link
  isDeleteLinkOpen: false,
  isReassignLinkBookOpen: false,
  isDeleteDrawerLinkOpen: false,
  openDeleteLink: (isOpen) => set({ isDeleteLinkOpen: isOpen }),
  openReassignLinkBook: (isOpen) => set({ isReassignLinkBookOpen: isOpen }),
  openDeleteDrawerLink: (isOpen) => set({ isDeleteDrawerLinkOpen: isOpen }),
}));
