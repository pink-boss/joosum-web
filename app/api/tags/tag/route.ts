import { serverApi } from "@/utils/api";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { tag: string } },
) {
  const { tag } = context.params;

  return serverApi({ path: `api/tags/${tag}`, method: "DELETE" });
}
