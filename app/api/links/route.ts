import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let queryString = `sort=${searchParams.get("sort")}&order=${searchParams.get("order")}`;
  if (searchParams.get("search")) {
    queryString += `&search=${searchParams.get("search")}`;
  }

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
