import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { useQueryAllLinks } from "./useQueryLinks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
};

export default function useQueryAllLinksHook({
  linkSort,
  linkFilter,
}: InputProps) {
  return useQueryAllLinks({ linkSort, linkFilter });
}
