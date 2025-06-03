import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { tag: string } },
) {
  const { tag } = await params;

  return serverApi({ path: `api/tags/${tag}`, method: "DELETE" });
}
