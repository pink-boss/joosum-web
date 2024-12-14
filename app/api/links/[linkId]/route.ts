import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  return serverApi({
    path: `api/links/${context.params.linkId}/read-count`,
    method: "PUT",
  });
}
