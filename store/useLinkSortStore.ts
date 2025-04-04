import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Field = "lastest" | "oldest" | "title" | "mostViewd";
type Sort = "created_at" | "title";
type OrderBy = "asc" | "desc";

export const defaultValues: Omit<LinkSortState, "setField"> = {
  field: "lastest",
  sort: "created_at",
  orderBy: "desc",
};

export interface LinkSortState {
  field: Field;
  sort: Sort;
  orderBy: OrderBy;
  setField: (field: Field) => void;
}

export const useLinkSortStore = create<LinkSortState>()(
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
      name: "link-sort-params",
      partialize: (state) => ({
        field: state.field,
        sort: state.sort,
        orderBy: state.orderBy,
      }),
    },
  ),
);
