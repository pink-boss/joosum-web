import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkBook } from "@/types/linkBook.types";
import { useQueryLinks } from "./useQueryLinks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export default function useQuerySearchLinks({
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  return useQueryLinks({ linkSort, linkFilter, linkBookId, type: "search" });
}
