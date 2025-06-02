import { NextRequest, NextResponse } from "next/server";

import { serverApi } from "@/utils/api";

export async function GET() {
  return serverApi({
    path: "api/tags",
  });
}

export async function POST(request: NextRequest) {
  const newTags = await request.json();

  const tagsResponse = await serverApi({
    path: "api/tags",
  });

  if (tagsResponse.status !== 200) {
    return NextResponse.json(tagsResponse);
  }

  const existingTags = await tagsResponse.json();

  return serverApi({
    path: `api/tags`,
    method: "POST",
    body: [...newTags, ...existingTags],
  });
}
