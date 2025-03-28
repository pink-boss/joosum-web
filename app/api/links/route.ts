import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = `sort=${searchParams.get("sort")}&order=${searchParams.get("order")}`;

  return serverApi({
    path: "api/links",
    queryString,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return serverApi({ path: "api/links", method: "POST", body });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  return serverApi({ path: "api/links", method: "DELETE", body });
}
