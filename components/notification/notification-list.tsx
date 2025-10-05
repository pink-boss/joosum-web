import Image from 'next/image';

import { useCallback, useEffect, useMemo } from 'react';

import clsx from 'clsx';

import { useGetNotifications, useUpdateNotification } from '@/services/notification';

import { Notification, TQueryNotifications } from '@/types/notification-list.types';

interface Props {
  setHasNotification: (hasNotification: boolean) => void;
}

export default function NotificationList({ setHasNotification }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetNotifications();

  const updateRead = useUpdateNotification();

  const handleUpdateRead = useCallback(
    (notificationId: Notification['notificationId']) => {
      updateRead.mutate(notificationId);
    },
    [updateRead],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allNotifications: Notification[] = useMemo(
    () => (data?.pages as unknown as TQueryNotifications)?.notifications ?? [],
    [data?.pages],
  );

  useEffect(() => {
    if (allNotifications.length > 0) {
      setHasNotification(allNotifications.some((notification) => !notification.isRead) ? true : false);
    }
  }, [allNotifications, setHasNotification]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="mb-24 mt-10 flex h-full flex-col items-center justify-center gap-5">
        <div className="text-gray-slate">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="mb-24 mt-10 flex h-full flex-col items-center justify-center gap-5">
        <div className="text-gray-slate">알림을 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return allNotifications.length > 0 ? (
    <div className="flex flex-col">
      <div className="h-[420px] overflow-y-scroll">
        {allNotifications.map((notification: Notification) => (
          // 알림 상세
          <button
            key={notification.notificationId}
            className={clsx('flex gap-3.5 py-5 pl-5 pr-4', notification.isRead && 'cursor-pointer bg-primary-100')}
            data-testid="detail_notification"
            type="button"
            onClick={() => {
              handleUpdateRead(notification.notificationId);
            }}
          >
            <Image
              alt="notification-type"
              className="size-6 flex-none"
              height={24}
              src={`/icons/${notification.type === 'folder' ? 'icon-notification-folder.png' : 'icon-notification-book-open.png'}`}
              width={24}
            />
            <div className="">
              <div className="text-lg font-bold">
                {notification.type === 'folder' ? '분류되지' : '읽지'} 않은 링크가 있어요
              </div>
              <div className="mt-1 text-gray-black">
                <p>{notification.title}</p>
                <p>{notification.body}</p>
              </div>
              <span className="mt-2 text-sm text-gray-slate">{notification.createdAt}</span>
            </div>
          </button>
        ))}
      </div>
      {hasNextPage ? (
        <div className="mx-auto my-5">
          {/* 알림 더보기 */}
          <button
            className="rounded-lg border border-gray-silver px-11 py-2 text-sm font-bold text-gray-dim disabled:opacity-50"
            data-testid="more_notification"
            disabled={isFetchingNextPage}
            type="button"
            onClick={handleLoadMore}
          >
            {isFetchingNextPage ? '로딩 중...' : '더보기'}
          </button>
        </div>
      ) : (
        <div className="mx-auto my-5 text-sm text-gray-slate">모든 알림을 불러왔습니다.</div>
      )}
    </div>
  ) : (
    <div className="mb-24 mt-10 flex h-full flex-col items-center justify-center gap-5">
      <Image alt="notification-bell" height={60} src="/icons/icon-basic-bell-gray.png" width={60} />
      <div className="text-center text-gray-slate">
        <p>확인 가능한 알림이 없어요.</p>
        <p>받은 알림은 최대 30일까지 저장돼요.</p>
      </div>
    </div>
  );
}
