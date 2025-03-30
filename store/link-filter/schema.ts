import { DateRange } from "@/types/date.types";

export interface LinkFilterState {
  unread: boolean;
  dateRange: DateRange;
  tags: string[];
  setUnread: (unread: boolean) => void;
  setDateRange: (dateRange: DateRange) => void;
  setTags: (tags: string[]) => void;
}

export type LinkFilterValues = Pick<
  LinkFilterState,
  "unread" | "dateRange" | "tags"
>;

export const defaultValues: LinkFilterValues = {
  unread: false,
  dateRange: [],
  tags: [],
};
