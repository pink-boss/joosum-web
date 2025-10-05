import { NextRequest } from 'next/server';

import { serverApi } from '@/utils/api';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ notificationId: string }> }) {
  const { notificationId } = await params;
  return serverApi({
    path: `api/notifications/${notificationId}`,
    method: 'PUT',
  });
}
