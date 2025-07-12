import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkBook } from "@/types/linkBook.types";
import { useQuerySearchLinks as useQuerySearchLinksBase } from "./useQueryLinks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

// TODO: 대시보드, 링크북, 검색 나눠서 쿼리 훅 만들기 & 리팩토링
export function useQueryLinks({
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  return useQuerySearchLinksBase({ linkSort, linkFilter, linkBookId });
}
