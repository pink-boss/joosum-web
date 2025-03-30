import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultValues, LinkFilterState } from "./schema";
export { defaultValues } from "./schema";

export type FolderLinkFilterState = LinkFilterState;

export const useFolderLinkFilterStore = create<LinkFilterState>()(
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
      name: "folder-link-filter",
      partialize: (state) => ({
        unread: state.unread,
        dateRange: state.dateRange,
        tags: state.tags,
      }),
    },
  ),
);
