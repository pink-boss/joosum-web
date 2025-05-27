import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LinkSortState, searchDefaultValues } from "./schema";
export { searchDefaultValues as defaultValues } from "./schema";

export const useSearchLinkSortStore = create<LinkSortState>()(
  persist(
    (set) => ({
      ...searchDefaultValues,
      setField: (field) => {
        if (field === "lastest")
          set({ field, sort: "created_at", orderBy: "desc" });
        else if (field === "oldest")
          set({ field, sort: "created_at", orderBy: "asc" });
        else if (["title", "relevance"].includes(field))
          set({ field, sort: "title", orderBy: "asc" });
        else set({ field, sort: "title", orderBy: "desc" }); // refech를 위한 상태 변경
      },
    }),
    {
      name: "search-link-sort",
      partialize: (state) => ({
        field: state.field,
        sort: state.sort,
        orderBy: state.orderBy,
      }),
    },
  ),
);
