import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(request: NextRequest) {
  return serverApi({
    path: "api/auth/me",
  });
}
