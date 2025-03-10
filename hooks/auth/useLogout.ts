import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/logout`, {
          method: "POST",
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      // TODO: accessToken 쿠키 삭제할 필요 없나?

      router.push("/login");
    },
  });
}
