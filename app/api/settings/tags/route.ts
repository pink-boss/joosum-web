import { NextRequest } from 'next/server';

import { serverApi } from '@/utils/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `sort=${searchParams.get('sort')}`;
  return serverApi({
    path: 'api/tags',
    queryString,
  });
}

export async function POST(request: NextRequest) {
  const newTags = await request.json();

  return serverApi({
    path: `api/tags`,
    method: 'POST',
    body: newTags,
  });
}
