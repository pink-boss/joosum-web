import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useDelete() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/me`, {
          method: "DELETE",
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}
