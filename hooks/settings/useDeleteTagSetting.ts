import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag, TagList } from "@/types/tags.types";

export default function useDeleteTagsSetting(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();

  return useMutation<[TagList], Error, Tag>({
    mutationFn: async (state: Tag) => {
      return (
        await fetch(`/api/settings/tags`, {
          method: "DELETE",
          body: JSON.stringify(state),
        })
      ).json();
    },
    onSuccess: ([newTags]) => {
      queryClient.setQueryData(["settings", "tags"], () => newTags);
      onSuccessCallback();
    },
  });
}
