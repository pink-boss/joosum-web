import { LoginResult, PreviousLoginProvider } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { handleApiResponse } from "../error";

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
  try {
    const { email } = jwtDecode(authToken) as { email: string };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_JOOSUM_WEB_URI}/api/auth/signup-check?email=${email}`,
    );
    await handleApiResponse(response);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
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

export async function storePreviousLoginProvider(
  provider: PreviousLoginProvider,
) {
  if (provider) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "previousLoginProvider",
      value: provider,
      maxAge: 60 * 60 * 365 * 100, // 100년
    });
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}
