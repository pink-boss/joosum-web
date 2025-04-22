import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { linkId: string } },
) {
  const { linkId } = await params;
  return serverApi({
    path: `api/links/${linkId}/read-count`,
    method: "PUT",
  });
}
