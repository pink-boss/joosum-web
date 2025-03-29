import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  const body = await request.json();
  const { linkId } = context.params;
  return serverApi({
    path: `api/links/${linkId}`,
    method: "PUT",
    body,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  const { linkId } = context.params;
  return serverApi({
    path: `api/links/${linkId}`,
    method: "DELETE",
  });
}
