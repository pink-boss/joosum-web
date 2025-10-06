import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { Notification } from '@/types/notification-list.types';

interface Props {
  onSuccess?: () => void;
}

export default function useUpdateNotification({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  return useMutation<undefined, Error, Notification['notificationId']>({
    mutationFn: async (notificationId) => {
      return apiCall(`/api/notifications/${notificationId}`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.log(error);
      toast({ status: 'fail', message: error.message });
    },
  });
}
