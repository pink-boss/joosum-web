import { serverApi } from "@/utils/api";

export async function GET() {
  return serverApi({
    path: "api/auth/me",
  });
}

// TODO: access token 제거되는지 확인
export async function DELETE() {
  return serverApi({
    path: "api/auth/me",
    method: "DELETE",
  });
}
