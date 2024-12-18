import { Link } from "@/types/link.types";
import { getLinkListQueryKey } from "@/utils/queryKey";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useLinkBookFromTitle from "./useLinkBookFromTitle";

export default function useLinkCache(currentLinkId?: string) {
  const queryClient = useQueryClient();
  const linkBook = useLinkBookFromTitle();
  const queryKey = getLinkListQueryKey(linkBook?.linkBookId);

  const { data } = useQuery<Link | undefined>({
    queryKey: ["link", "current"],
    enabled: !!currentLinkId,
    queryFn: () => {
      const linkList = queryClient.getQueryData<Link[]>(queryKey) ?? [];
      console.log("linkList:", linkList);
      return linkList.find((link) => link.linkId === currentLinkId);
    },
    staleTime: Infinity,
  });

  return data;
}
