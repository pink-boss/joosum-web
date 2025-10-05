import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LinkSortState, SEARCH_SORT_DEFAULT_VALUES } from '@/libs/zustand/schema';

export const useSearchLinkSortStore = create<LinkSortState>()(
  persist(
    (set) => ({
      ...SEARCH_SORT_DEFAULT_VALUES,
      setField: (field) => {
        if (field === 'lastest') set({ field, sort: 'created_at', order: 'desc' });
        else if (field === 'oldest') set({ field, sort: 'created_at', order: 'asc' });
        else if (['relevance', 'title'].includes(field)) set({ field, sort: 'title', order: 'asc' });
        else set({ field, sort: 'title', order: 'desc' }); // refech를 위한 상태 변경
      },
    }),
    {
      name: 'search-link-sort',
      partialize: (state) => ({
        field: state.field,
        sort: state.sort,
        order: state.order,
      }),
    },
  ),
);
