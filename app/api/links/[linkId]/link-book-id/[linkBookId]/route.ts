import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string; linkBookId: string } },
) {
  const { linkId, linkBookId } = context.params;

  return serverApi({
    path: `api/links/${linkId}/link-book-id/${linkBookId}`,
    method: "PUT",
  });
}
