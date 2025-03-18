import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

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
