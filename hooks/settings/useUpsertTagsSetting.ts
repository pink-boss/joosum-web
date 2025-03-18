import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TagList } from "@/types/tags.types";

export default function useUpsertTagsSetting() {
  const queryClient = useQueryClient();

  return useMutation<[TagList], Error, TagList>({
    mutationFn: async (state: TagList) => {
      return (
        await fetch(`/api/settings/tags`, {
          method: "POST",
          body: JSON.stringify(state),
        })
      ).json();
    },
    onSuccess: ([newTags]) => {
      queryClient.setQueryData(["settings", "tags"], () => newTags);
    },
  });
}
