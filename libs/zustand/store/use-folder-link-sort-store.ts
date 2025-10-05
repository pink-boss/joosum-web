import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LinkSortState, SORT_DEFAULT_VALUES } from '@/libs/zustand/schema';

export const useFolderLinkSortStore = create<LinkSortState>()(
  persist(
    (set) => ({
      ...SORT_DEFAULT_VALUES,
      setField: (field) => {
        if (field === 'lastest') set({ field, sort: 'created_at', order: 'desc' });
        else if (field === 'oldest') set({ field, sort: 'created_at', order: 'asc' });
        else if (field === 'title') set({ field, sort: 'title', order: 'asc' });
        else set({ field, sort: 'title', order: 'desc' }); // refech를 위한 상태 변경
      },
    }),
    {
      name: 'folder-link-sort',
      partialize: (state) => ({
        field: state.field,
        sort: state.sort,
        order: state.order,
      }),
    },
  ),
);
