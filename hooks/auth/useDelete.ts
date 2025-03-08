import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDelete(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/delete`, {
          method: "DELETE",
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      onSuccessCallback();
    },
  });
}
