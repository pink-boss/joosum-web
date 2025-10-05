export type LinkField = 'lastest' | 'mostViewd' | 'oldest' | 'relevance' | 'title';

type LinkSort = 'created_at' | 'title';

type LinkOrder = 'asc' | 'desc';

export const SORT_DEFAULT_VALUES: Omit<LinkSortState, 'setField'> = {
  field: 'lastest',
  sort: 'created_at',
  order: 'desc',
};

export const SEARCH_SORT_DEFAULT_VALUES: Omit<LinkSortState, 'setField'> = {
  field: 'relevance',
  sort: SORT_DEFAULT_VALUES.sort,
  order: SORT_DEFAULT_VALUES.order,
};

export interface LinkSortState {
  field: LinkField;
  sort: LinkSort;
  order: LinkOrder;
  setField: (field: LinkField) => void;
}
