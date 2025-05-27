import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET() {
  return serverApi({
    path: "api/settings/notification",
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  return serverApi({
    path: `api/settings/notification`,
    method: "PUT",
    body,
  });
}
