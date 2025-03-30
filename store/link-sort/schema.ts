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
