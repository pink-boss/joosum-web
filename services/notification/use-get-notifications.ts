import { useInfiniteQuery } from '@tanstack/react-query';

import { TQueryNotifications } from '@/types/notification-list.types';

export default function useGetNotifications() {
  return useInfiniteQuery<TQueryNotifications>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 0 }: { pageParam?: unknown }) => {
      const res = await fetch(`/api/notifications?page=${pageParam}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch notifications');
      }

      return res.json();

      // 실제 API 대신 더미 데이터 반환 (개발용)
      // const pageData: TQueryNotifications = {
      //   notifications: Array.from({ length: 10 }, (_, i) => ({
      //     body: `페이지 ${pageParam} - 알림 본문 내용 ${i + 1 + pageParam * 10}`,
      //     createdAt: new Date(
      //       Date.now() - (pageParam * 10 + i) * 1000 * 60 * 60,
      //     ).toISOString(),
      //     isRead: (pageParam * 10 + i) % 2 === 0,
      //     notificationId: `notification-${pageParam}-${i + 1}`,
      //     title: `페이지 ${pageParam} - 알림 제목 ${i + 1 + pageParam * 10}`,
      //     type: (pageParam * 10 + i) % 2 === 0 ? "folder" : "book",
      //     userId: `user-1`,
      //   })),
      //   page: {
      //     next: pageParam < 2 ? pageParam + 1 : -1, // 총 3페이지까지만
      //     page: pageParam as number,
      //     perPage: 10,
      //     prev: pageParam > 0 ? pageParam - 1 : -1,
      //     total: 25,
      //     totalPage: 3,
      //   },
      // };

      // return pageData;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // next가 -1이면 더 이상 페이지가 없음을 의미
      return lastPage.page.next !== -1 ? lastPage.page.next : undefined;
    },
  });
}
