import { NextRequest } from 'next/server';

import { serverApi } from '@/utils/api';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ linkBookId: string; linkId: string }> },
) {
  const { linkId, linkBookId } = await params;

  return serverApi({
    path: `api/links/${linkId}/link-book-id/${linkBookId}`,
    method: 'PUT',
  });
}
