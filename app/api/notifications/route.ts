import { NextRequest } from 'next/server';

import { serverApi } from '@/utils/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `page=${searchParams.get('page')}`;
  return serverApi({
    path: 'api/notifications',
    queryString,
  });
}
