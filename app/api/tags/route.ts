import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET() {
  return serverApi({
    path: "api/tags",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return serverApi({
    path: `api/tags`,
    method: "POST",
    body,
  });
}
