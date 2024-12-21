import { useQuery } from "@tanstack/react-query";

import { Sort } from "@/store/useLinkBookSortStore";
import { TQueryLinkBooks } from "@/types/linkBook.types";

export default function useQueryLinkBooks(sort: Sort) {
  return useQuery<TQueryLinkBooks>({
    queryKey: ["linkBookList", sort],
    queryFn: () =>
      fetch(`/api/link-books?sort=${sort}`, {
        method: "GET",
      }).then((res) => res.json()),
  });
}
