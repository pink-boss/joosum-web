import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchLinkState {
  sort: 'created_at' | 'title' | 'updated_at';
  order: 'asc' | 'desc';
  search?: string;
  setSort: (sort: SearchLinkState['sort']) => void;
  setOrder: (order: SearchLinkState['order']) => void;
  setSearch: (search: string) => void;
}

export const useSearchLinkStore = create<SearchLinkState>()(
  persist(
    (set) => ({
      sort: 'created_at',
      order: 'asc',
      search: undefined,
      setSort: (sort) => set({ sort }),
      setOrder: (order) => set({ order }),
      setSearch: (search) => set({ search }),
    }),
    {
      name: 'search-params',
      partialize: (state) => ({
        sort: state.sort,
        order: state.order,
        search: state.search,
      }),
    },
  ),
);
