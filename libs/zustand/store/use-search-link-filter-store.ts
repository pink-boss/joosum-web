import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LINK_FILTER_DEFAULT_VALUES, LinkFilterState, LinkFilterValues } from '@/libs/zustand/schema';

export type SearchLinkFilterState = LinkFilterState & {
  folderId?: string;
  resetFolderId: () => void;
  setFolderId: (folderId: string) => void;
};

type SearchLinkFilterValues = LinkFilterValues & Pick<SearchLinkFilterState, 'folderId'>;

export const initialSearchLinkFilter: SearchLinkFilterValues = {
  ...LINK_FILTER_DEFAULT_VALUES,
  folderId: '',
};

export const useSearchLinkFilterStore = create<SearchLinkFilterState>()(
  persist(
    (set) => ({
      ...initialSearchLinkFilter,
      setUnread: (unread) => set({ unread }),
      setDateRange: (dateRange) => set({ dateRange }),
      setTags: (tags = []) => {
        if (tags.length < 11) {
          set({ tags });
        }
      },
      setFolderId: (folderId) => set({ folderId }),
      resetFolderId: () => set({ folderId: undefined, ...initialSearchLinkFilter }),
    }),
    {
      name: 'search-link-filter',
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
        folderId: state.folderId,
      }),
    },
  ),
);
