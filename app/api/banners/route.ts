import { fetchToServer } from "@/utils/api";

export async function GET() {
  return fetchToServer({
    path: "api/banners",
  });
}
