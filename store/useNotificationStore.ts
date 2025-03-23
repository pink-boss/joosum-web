import { create } from "zustand";

type state = {
  isNotificationOpen: boolean;
  openNotification: (isOpen: boolean) => void;
};

export const useOpenNotificationStore = create<state>()((set) => ({
  isNotificationOpen: false,
  openNotification: (isOpen) => set({ isNotificationOpen: isOpen }),
}));
