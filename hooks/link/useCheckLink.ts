import { Link } from "@/types/link.types";
import { LinkBookIdParam } from "@/types/linkBook.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const queryKey = ["link", "checkedId"];

export default function useCheckLink() {
  const queryClient = useQueryClient();
  const { linkBookId } = useParams<LinkBookIdParam>();

  const { data } = useQuery({
    queryKey,
    enabled:
      queryClient.getQueryState(["linkList", linkBookId])?.status === "success",
    queryFn: () => queryClient.getQueryData<string[]>(queryKey),
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
    const allLinks = queryClient.getQueryData<Link[]>(["linkList", linkBookId]);
    queryClient.setQueryData(
      queryKey,
      isAllChecked ? null : allLinks?.map((link) => link.linkId),
    );
  };

  const clearLinks = () => {
    queryClient.setQueryData(queryKey, null);
  };

  return { cachedLinks: new Set(data), setCachedLink, setAllLinks, clearLinks };
}
