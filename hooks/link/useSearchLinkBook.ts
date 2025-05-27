import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { LinkBook } from "@/types/linkBook.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useSearchLinkBook(): LinkBook | undefined {
  const { linkBookId: selectedLinkBookId } = useSearchLinkFilterStore();

  const queryClient = useQueryClient();

  const { data } = useQuery<LinkBook | undefined>({
    queryKey: ["linkBookList", "search"],
    enabled: !!selectedLinkBookId,
    queryFn: () => {
      const linkBookList =
        queryClient.getQueryData<LinkBook[]>(["linkBookList"]) ?? [];
      return linkBookList.find(
        (linkBook) => linkBook.linkBookId === selectedLinkBookId,
      );
    },
    staleTime: Infinity,
  });

  return data;
}
