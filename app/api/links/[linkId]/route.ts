import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  const body = await request.json();
  return serverApi({
    path: `api/links/${context.params.linkId}`,
    method: "PUT",
    body,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  return serverApi({
    path: `api/links/${context.params.linkId}`,
    method: "DELETE",
  });
}
