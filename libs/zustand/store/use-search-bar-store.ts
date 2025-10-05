import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchBarState {
  title: string;
  setTitle: (title: string) => void;
}

export const useSearchBarStore = create<SearchBarState>()(
  persist(
    (set) => ({
      title: '',
      setTitle: (title) => set({ title }),
    }),
    {
      name: 'search-bar',
      partialize: (state) => ({
        title: state.title,
      }),
    },
  ),
);
