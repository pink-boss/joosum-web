import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LogoutResult } from '@/types/auth.types';

export default function useLogout() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation<LogoutResult, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/logout`, {
          method: 'POST',
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
}
