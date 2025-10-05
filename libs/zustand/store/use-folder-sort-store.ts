import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FolderSort = 'created_at' | 'last_saved_at' | 'title';

export interface FolderSortState {
  sort: FolderSort;
  setSort: (sort: FolderSort) => void;
}

export const useFolderSortStore = create<FolderSortState>()(
  persist(
    (set) => ({
      sort: 'created_at',
      setSort: (sort) => set({ sort }),
    }),
    {
      name: 'folder-sort-params',
      partialize: (state) => ({
        sort: state.sort,
      }),
    },
  ),
);
