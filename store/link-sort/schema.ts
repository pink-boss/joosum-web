export type Field = "lastest" | "oldest" | "title" | "mostViewd" | "relevance";
type Sort = "created_at" | "title";
type Order = "asc" | "desc";

export const defaultValues: Omit<LinkSortState, "setField"> = {
  field: "lastest",
  sort: "created_at",
  order: "desc",
};

export const searchDefaultValues: Omit<LinkSortState, "setField"> = {
  field: "relevance",
  sort: defaultValues.sort,
  order: defaultValues.order,
};

export interface LinkSortState {
  field: Field;
  sort: Sort;
  order: Order;
  setField: (field: Field) => void;
}
