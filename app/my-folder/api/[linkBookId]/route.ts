import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { linkBookId: string } },
) {
  const body = await request.json();
  const linkBookId = context.params.linkBookId;

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
  const linkBookId = context.params.linkBookId;

  return serverApi({ path: `api/link-books/${linkBookId}`, method: "DELETE" });
}
