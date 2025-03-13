import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { TagList } from "@/types/tag.types";

export function useQueryTagSetting() {
  const { data, refetch, ...others } = useQuery<TagList, ApiError>({
    queryKey: ["settings", "tag"],
    queryFn: () =>
      fetch(`/api/settings/tag`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  return { ...others, data, refetch };
}
