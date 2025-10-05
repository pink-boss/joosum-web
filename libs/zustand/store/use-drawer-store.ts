import { create } from 'zustand';

import { Link } from '@/types/link.types';

type LinkDrawerInputState =
  | { drawerDataTestId: string; isLinkDrawerOpen: true; link: Link; mode: 'mutate' }
  | { drawerDataTestId: string; isLinkDrawerOpen: true; link: Link | undefined; mode: 'save' }
  | { drawerDataTestId: undefined; isLinkDrawerOpen: false; link: undefined; mode: undefined };

type LinkDrawerState = LinkDrawerInputState & {
  openLinkDrawer: {
    (isOpen: true, mode: 'mutate', link: Link, drawerDataTestId?: string): void;
    (isOpen: true, mode: 'save', link?: Link, drawerDataTestId?: string): void;
    (isOpen: false): void;
  };
};

type UserDrawerState = {
  isUserDrawerOpen: boolean;
  openUserDrawer: (isOpen: boolean) => void;
};

type DrawerState = LinkDrawerState & UserDrawerState;

export const useDrawerStore = create<DrawerState>()((set) => ({
  // 통합 링크 drawer
  isLinkDrawerOpen: false,
  link: undefined,
  mode: undefined,
  drawerDataTestId: undefined,
  openLinkDrawer: ((isOpen: boolean, mode?: 'mutate' | 'save', link?: Link, drawerDataTestId?: string) => {
    if (isOpen && mode === 'mutate' && !link) {
      throw new Error('Link must be provided when opening mutate mode');
    }
    set({
      isLinkDrawerOpen: isOpen,
      mode: isOpen ? mode : undefined,
      link: isOpen ? link : undefined,
      drawerDataTestId: isOpen ? drawerDataTestId : undefined,
    } as LinkDrawerState);
  }) as LinkDrawerState['openLinkDrawer'],

  // 내정보 drawer
  isUserDrawerOpen: false,
  openUserDrawer: (isOpen: boolean) => set({ isUserDrawerOpen: isOpen }),
}));
