import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteAccount() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/auth/me`, {
          method: 'DELETE',
        })
      ).json(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
}
