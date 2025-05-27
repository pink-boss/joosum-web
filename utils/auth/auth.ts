import { LoginResult } from "@/types/auth.types";
import { cookies } from "next/headers";

export function handleAuthToken(result: LoginResult) {
  if ("error" in result) {
    throw new Error(result.error);
  }

  storeAccessTokenInCookie(result.accessToken);
}

async function storeAccessTokenInCookie(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 365 * 10,
  });
}

export async function isExist(
  authToken: string,
  social: "apple" | "google",
): Promise<boolean> {
  // TODO: 실제 사용자 존재 여부 확인 로직 구현
  return true;
}

export async function storeAuthTokenForOnboarding(
  idToken: string,
  social: "apple" | "google",
) {
  const cookieStore = await cookies();
  cookieStore.set("idToken", idToken, {
    httpOnly: true,
    maxAge: 60 * 10, // 10분
    secure: true,
  });
  cookieStore.set("social", social, {
    httpOnly: true,
    maxAge: 60 * 10, // 10분
    secure: true,
  });
}

export async function storeAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 365 * 10, // 10년
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}
