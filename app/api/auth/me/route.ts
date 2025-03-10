import { NextRequest } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET(request: NextRequest) {
  return serverApi({
    path: "api/auth/me",
  });
}

export async function DELETE() {
  console.log("delete in server");
  return serverApi({
    path: "api/auth/me",
    method: "DELETE",
  });
}
