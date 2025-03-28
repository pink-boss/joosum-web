import { LogoutResult } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<LogoutResult, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/logout`, {
          method: "POST",
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}
