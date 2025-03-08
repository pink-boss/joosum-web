import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogout(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/logout`, {
          method: "POST",
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      // accessToken 쿠키 삭제
      onSuccessCallback();
    },
  });
}
