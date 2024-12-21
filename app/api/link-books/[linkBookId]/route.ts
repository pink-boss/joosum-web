import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string; linkBookId: string } },
) {
  const { linkBookId } = context.params;
  const body = await request.json();

  return serverApi({
    path: `api/link-books/${linkBookId}`,
    method: "PUT",
    body,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { linkBookId: string } },
) {
  const { linkBookId } = context.params;

  return serverApi({
    path: `api/link-books/${linkBookId}`,
    method: "DELETE",
  });
}
