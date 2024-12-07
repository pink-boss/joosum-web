import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `sort=${searchParams.get("sort")}&order=${searchParams.get("order")}`;

  return serverApi({
    path: "api/links",
    queryString,
  });
}
