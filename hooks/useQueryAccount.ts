import { useQuery } from "@tanstack/react-query";

import { Account } from "@/types/account.types";

export default function useQueryAccount() {
  return useQuery<Account | undefined>({
    queryKey: ["account"],
    queryFn: () =>
      fetch(`/api/auth/me`, {
        method: "GET",
      }).then(async (res) => {
        const result = (await res.json()) as Account | ApiError;
        if ("error" in result) {
          alert("사용자 정보를 찾을 수 없습니다.");
          return;
        }
        return result;
      }),
  });
}
