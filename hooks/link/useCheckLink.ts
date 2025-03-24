import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Link } from "@/types/link.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

import useLinkBookFromTitle from "./useLinkBookFromTitle";

const queryKey = ["link", "checkedId"];

export default function useCheckLink() {
  const queryClient = useQueryClient();
  const linkBook = useLinkBookFromTitle();

  const { data } = useQuery({
    queryKey,
    enabled:
      queryClient.getQueryState(getLinkListQueryKey(linkBook?.linkBookId))
        ?.status === "success",
    queryFn: () => queryClient.getQueryData<string[]>(queryKey) ?? [],
    staleTime: Infinity,
  });

  const setCachedLink = (linkId: string) => {
    const newSet = new Set(data);
    if (newSet.has(linkId)) {
      newSet.delete(linkId);
    } else {
      newSet.add(linkId);
    }
    queryClient.setQueryData(queryKey, [...newSet]);
  };

  const setAllLinks = (isAllChecked: boolean) => {
    const allLinks = queryClient.getQueryData<Link[]>(
      getLinkListQueryKey(linkBook?.linkBookId),
    );
    queryClient.setQueryData(
      queryKey,
      isAllChecked ? allLinks?.map((link) => link.linkId) : null,
    );
  };

  const clearLinks = () => {
    queryClient.setQueryData(queryKey, null);
  };

  return { cachedLinks: new Set(data), setCachedLink, setAllLinks, clearLinks };
}
