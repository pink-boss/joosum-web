import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  openSideMenu: boolean;
  setOpenSideMenu: (openSideMenu: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      openSideMenu: true,
      setOpenSideMenu: (openSideMenu) => set({ openSideMenu }),
    }),
    {
      name: 'layout',
      partialize: ({ openSideMenu }) => ({
        openSideMenu,
      }),
    },
  ),
);
