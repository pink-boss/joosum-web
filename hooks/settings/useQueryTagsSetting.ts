import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { TagList } from "@/types/tags.types";
import { getTagsQueryKey } from "@/utils/queryKey";

export function useQueryTagsSetting() {
  const { data, refetch, ...others } = useQuery<TagList, ApiError>({
    queryKey: getTagsQueryKey("created"),
    queryFn: () =>
      fetch(`/api/settings/tags?sort=created`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  return { ...others, data, refetch };
}
