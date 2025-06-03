import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import { LinkBook, TQueryLinkBooks } from "@/types/linkBook.types";

export default function useSelectLinkBook(_title?: string) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(_title);
  const [linkBook, setLinkBook] = useState<LinkBook | undefined>();

  const queryKey = useMemo(() => ["linkBook", "title", title], [title]);

  const { refetch } = useQuery({
    queryKey,
    enabled:
      !!title &&
      queryClient.getQueryState(["linkBookList", "created_at"])?.status ===
        "success",
    queryFn: () => {
      const linkBookList = queryClient.getQueryData<TQueryLinkBooks>([
        "linkBookList",
        "created_at",
      ]);

      if (!linkBookList) return undefined;

      const found = linkBookList.linkBooks?.find((linkBook) => {
        return linkBook.title === title;
      });
      if (found) {
        queryClient.setQueryData(queryKey, found);
      }
      return found;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (_title) setTitle(_title);
  }, [_title]);

  useEffect(() => {
    if (title) {
      setLinkBook(queryClient.getQueryData<LinkBook>(queryKey));
    }
  }, [queryClient, queryKey, title]);

  const clearLinkBook = () => {
    setTitle(undefined);
    setLinkBook(undefined);
  };

  return { linkBook, clearLinkBook, refetch };
}
