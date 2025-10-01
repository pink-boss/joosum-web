import { NextRequest } from 'next/server';

import { serverApi } from '@/utils/api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ linkBookId: string }> }) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `sort=${searchParams.get('sort')}&order=${searchParams.get('order')}`;
  const { linkBookId } = await params;

  return serverApi({
    path: `api/link-books/${linkBookId}/links`,
    queryString,
  });
}
