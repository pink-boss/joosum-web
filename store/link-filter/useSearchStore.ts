import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  defaultValues as _defaultValues,
  LinkFilterState,
  LinkFilterValues,
} from "./schema";

export type SearchLinkFilterState = LinkFilterState & {
  linkBookId?: string;
  setLinkBookId: (linkBookId: string) => void;
  resetLinkBookId: () => void;
};

type SearchLinkFilterValues = LinkFilterValues &
  Pick<SearchLinkFilterState, "linkBookId">;

export const defaultValues: SearchLinkFilterValues = {
  ..._defaultValues,
  linkBookId: "",
};

export const useSearchLinkFilterStore = create<SearchLinkFilterState>()(
  persist(
    (set) => ({
      ...defaultValues,
      setUnread: (unread) => set({ unread }),
      setDateRange: (dateRange) => set({ dateRange }),
      setTags: (tags = []) => {
        if (tags.length < 11) {
          set({ tags });
        }
      },
      setLinkBookId: (linkBookId) => set({ linkBookId }),
      resetLinkBookId: () => set({ linkBookId: undefined, ...defaultValues }),
    }),
    {
      name: "search-link-filter",
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
        linkBookId: state.linkBookId,
      }),
    },
  ),
);
