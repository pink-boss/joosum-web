import { ApiError } from 'next/dist/server/api-utils';

import { useQuery } from '@tanstack/react-query';

import { NotificationSetting } from '@/types/notification-settings.types';

export default function useGetNotificationSetting() {
  const { data, refetch, ...others } = useQuery<NotificationSetting, ApiError>({
    queryKey: ['settings', 'notification'],
    queryFn: () =>
      fetch(`/api/settings/notification`, {
        method: 'GET',
      }).then((res) => res.json()),
  });

  return { ...others, data, refetch };
}
