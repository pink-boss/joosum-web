import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET() {
  return serverApi({ path: "api/link-books" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  return serverApi({ path: "api/link-books", method: "POST", body });
}
