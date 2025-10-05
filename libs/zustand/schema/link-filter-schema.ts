import { DateRange } from '@/types/date.types';

export interface LinkFilterState {
  unread: boolean;
  dateRange: DateRange;
  tags: string[];
  setUnread: (unread: boolean) => void;
  setDateRange: (dateRange: DateRange) => void;
  setTags: (tags: string[]) => void;
}

export type LinkFilterValues = Pick<LinkFilterState, 'dateRange' | 'tags' | 'unread'>;

export const LINK_FILTER_DEFAULT_VALUES: LinkFilterValues = {
  unread: false,
  dateRange: [],
  tags: [],
};
