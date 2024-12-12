import { useLinkBookSortStore } from "@/store/useLinkBookSortStore";
import { TQueryLinkBooks } from "@/types/linkBook.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLinkBooks(position: "menu" | "linkBook") {
  const { sort } = useLinkBookSortStore();

  return useQuery<TQueryLinkBooks>({
    queryKey: position === "linkBook" ? ["linkBooks", sort] : ["linkBooks"],
    queryFn: () =>
      fetch(`/my-folder/api${position === "linkBook" ? `?sort=${sort}` : ""}`, {
        method: "GET",
      }).then((res) => res.json()),
  });
}
