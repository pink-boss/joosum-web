import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { Notification } from '@/types/notification-list.types';

export default function useUpdateNotification(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation<undefined, Error, Notification['notificationId']>({
    mutationFn: async (notificationId) => {
      return apiCall(`/api/notifications/${notificationId}`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast({ status: 'fail', message: error.message });
    },
  });
}
