import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkBook } from "@/types/linkBook.types";
import {
  useQueryLinkBookLinks as useQueryLinkBookLinksBase,
  useQueryAllLinks,
} from "./useQueryLinks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export function useQueryLinkBookLinks({
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  if (linkBookId) {
    return useQueryLinkBookLinksBase({ linkSort, linkFilter, linkBookId });
  } else {
    return useQueryAllLinks({ linkSort, linkFilter });
  }
}
