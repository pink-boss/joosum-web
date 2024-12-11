import { serverApi } from "@/utils/api";

export async function GET() {
  return serverApi({
    path: "api/tags",
  });
}
