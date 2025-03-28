import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string; linkBookId: string } },
) {
  const { linkId, linkBookId } = context.params;

  return serverApi({
    path: `api/links/${linkId}/link-book-id/${linkBookId}`,
    method: "PUT",
  });
}
