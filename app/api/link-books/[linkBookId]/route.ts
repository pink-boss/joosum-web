import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { linkBookId: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `sort=${searchParams.get("sort")}&order=${searchParams.get("order")}`;
  const linkBookId = context.params.linkBookId;

  return serverApi({
    path: `api/link-books/${linkBookId}/links`,
    queryString,
  });
}
