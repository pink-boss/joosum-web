import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> },
) {
  const body = await request.json();
  const { linkId } = await params;
  return serverApi({
    path: `api/links/${linkId}`,
    method: "PUT",
    body,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> },
) {
  const { linkId } = await params;
  return serverApi({
    path: `api/links/${linkId}`,
    method: "DELETE",
  });
}
