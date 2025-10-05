import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LINK_FILTER_DEFAULT_VALUES, LinkFilterState } from '@/libs/zustand/schema';

export type FolderLinkFilterState = LinkFilterState;

export const useFolderLinkFilterStore = create<LinkFilterState>()(
  persist(
    (set) => ({
      ...LINK_FILTER_DEFAULT_VALUES,
      setUnread: (unread) => set({ unread }),
      setDateRange: (dateRange) => set({ dateRange }),
      setTags: (tags = []) => {
        if (tags.length < 11) {
          set({ tags });
        }
      },
    }),
    {
      name: 'folder-link-filter',
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
      }),
    },
  ),
);
