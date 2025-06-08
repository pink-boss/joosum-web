import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string; linkBookId: string }> },
) {
  const { linkBookId } = await params;
  const body = await request.json();

  return serverApi({
    path: `api/link-books/${linkBookId}`,
    method: "PUT",
    body,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ linkBookId: string }> },
) {
  const { linkBookId } = await params;

  return serverApi({
    path: `api/link-books/${linkBookId}`,
    method: "DELETE",
  });
}
