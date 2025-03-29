import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  const { linkId } = context.params;
  return serverApi({
    path: `api/links/${linkId}/read-count`,
    method: "PUT",
  });
}
