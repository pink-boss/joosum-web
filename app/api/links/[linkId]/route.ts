import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { linkId: string } },
) {
  const path = request.nextUrl.pathname;

  // 조회 수 증가
  if (path.endsWith("/read-count")) {
    return serverApi({
      path: `api/links/${context.params.linkId}/read-count`,
      method: "PUT",
    });
  }

  // 링크 수정
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
