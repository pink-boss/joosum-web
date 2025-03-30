import { LoginResult } from "@/types/auth.types";
import { cookies } from "next/headers";

export function handleAuthToken(result: LoginResult) {
  if ("error" in result) {
    throw new Error(result.error);
  }

  storeAccessTokenInCookie(result.accessToken);
}

function storeAccessTokenInCookie(accessToken: string) {
  cookies().set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 365 * 10,
  });
}

export function logout() {
  cookies().delete("accessToken");
}
