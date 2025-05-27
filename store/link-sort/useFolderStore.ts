import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultValues, LinkSortState } from "./schema";
export { defaultValues } from "./schema";

export const useFolderLinkSortStore = create<LinkSortState>()(
  persist(
    (set) => ({
      ...defaultValues,
      setField: (field) => {
        if (field === "lastest")
          set({ field, sort: "created_at", orderBy: "desc" });
        else if (field === "oldest")
          set({ field, sort: "created_at", orderBy: "asc" });
        else if (field === "title")
          set({ field, sort: "title", orderBy: "asc" });
        else set({ field, sort: "title", orderBy: "desc" }); // refech를 위한 상태 변경
      },
    }),
    {
      name: "folder-link-sort",
      partialize: (state) => ({
        field: state.field,
        sort: state.sort,
        orderBy: state.orderBy,
      }),
    },
  ),
);
