import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DateRange } from "@/types/date.types";

export interface LinkFilterState {
  unread: boolean;
  dateRange: DateRange;
  tags: string[];
  setUnread: (unread: boolean) => void;
  setDateRange: (dateRange: DateRange) => void;
  setTags: (tags: string[]) => void;
}

export const defaultValues: Pick<
  LinkFilterState,
  "unread" | "dateRange" | "tags"
> = {
  unread: false,
  dateRange: [],
  tags: [],
};

export const useLinkFilterStore = create<LinkFilterState>()(
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
    }),
    {
      name: "link-filter-params",
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
      }),
    },
  ),
);
