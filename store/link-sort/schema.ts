export type Field = "lastest" | "oldest" | "title" | "mostViewd" | "relevance";
type Sort = "created_at" | "title";
type OrderBy = "asc" | "desc";

export const defaultValues: Omit<LinkSortState, "setField"> = {
  field: "lastest",
  sort: "created_at",
  orderBy: "desc",
};

export const searchDefaultValues: Omit<LinkSortState, "setField"> = {
  field: "relevance",
  sort: defaultValues.sort,
  orderBy: defaultValues.orderBy,
};

export interface LinkSortState {
  field: Field;
  sort: Sort;
  orderBy: OrderBy;
  setField: (field: Field) => void;
}
