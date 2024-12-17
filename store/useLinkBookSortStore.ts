import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Sort = "created_at" | "title" | "last_saved_at";

export interface LinkBookSortState {
  sort: Sort;
  setSort: (sort: Sort) => void;
}

export const useLinkBookSortStore = create<LinkBookSortState>()(
  persist(
    (set) => ({
      sort: "created_at",
      setSort: (sort) => set({ sort }),
    }),
    {
      name: "link-book-sort-params",
      partialize: (state) => ({
        sort: state.sort,
      }),
    },
  ),
);
