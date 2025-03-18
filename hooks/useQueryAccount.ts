import { useQuery } from "@tanstack/react-query";

import { TQueryAccount } from "@/types/account.types";
import { isApiError } from "@/utils/error";

export default function useQueryAccount() {
  return useQuery<TQueryAccount, ApiError>({
    queryKey: ["account"],
    queryFn: () =>
      fetch(`/api/auth/me`, {
        method: "GET",
      }).then(async (res) => {
        const result = await res.json();
        if (isApiError(result)) {
          alert("사용자 정보를 찾을 수 없습니다.");
          return;
        }
        return result;
      }),
  });
}
