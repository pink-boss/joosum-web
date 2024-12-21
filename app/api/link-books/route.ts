import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(request: NextRequest) {
  const sort = request.nextUrl.searchParams.get("sort");
  const queryString = sort && `sort=${sort}`;

  return serverApi({ path: "api/link-books", queryString });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return serverApi({ path: "api/link-books", method: "POST", body });
}
