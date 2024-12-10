import { DateRange } from "@/app/my-folder/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LinkFilterState {
  unread: boolean;
  dateRange: DateRange;
  tags: string[];
  setUnread: (unread: boolean) => void;
  setDateRange: (dateRange: DateRange) => void;
  setTags: (tags: string[] | undefined) => void;
}

export const useLinkFilterStore = create<LinkFilterState>()(
  persist(
    (set) => ({
      unread: false,
      dateRange: [],
      tags: [],
      setUnread: (unread) => set({ unread }),
      setDateRange: (dateRange) => set({ dateRange }),
      setTags: (tags = []) => {
        if (tags.length < 11) {
          set({ tags });
        }
      },
    }),
    {
      name: "search-params",
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
      }),
    },
  ),
);
