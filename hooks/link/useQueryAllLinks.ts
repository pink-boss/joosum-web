import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { useQueryLinks } from "./useQueryLinks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
};

export default function useQueryAllLinks({ linkSort, linkFilter }: InputProps) {
  return useQueryLinks({ linkSort, linkFilter, type: "all" });
}
