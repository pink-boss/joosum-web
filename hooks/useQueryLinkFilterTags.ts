import { getTagsQueryKey } from "@/utils/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLinkFilterTags() {
  const {
    isPending,
    error,
    data: totalTags = [],
  } = useQuery<string[]>({
    queryKey: getTagsQueryKey("used"),
    queryFn: () =>
      fetch(`/api/settings/tags?sort=used`, {
        method: "GET",
      }).then((res) => res.json()),
    staleTime: 60 * 60 * 1000,
  });

  return {
    isPending,
    error,
    totalTags,
  };
}
