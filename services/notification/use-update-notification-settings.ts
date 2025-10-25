import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { UpdateFormResult, UpdateFormState } from '@/types/notification-settings.types';

export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<ApiError | undefined | UpdateFormResult, Error, UpdateFormState>({
    mutationFn: async (notification) => {
      return apiCall(`/api/settings/notification`, {
        method: 'PUT',
        body: JSON.stringify(notification),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', 'notification'],
      });
      toast({ status: 'success', message: '알림 설정이 변경되었습니다.' });
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
