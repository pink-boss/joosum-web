import { LoginResult, PreviousLoginProvider } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { handleApiResponse } from "../error";
import { getClientUri, getServerApiUri } from "../envUri";

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

export async function isExist(idToken: string): Promise<boolean> {
  try {
    const { email } = jwtDecode(idToken) as { email: string };

    const response = await fetch(
      `${getClientUri()}/api/auth/signup-check?email=${email}`,
    );
    const { signedUp, ...props } = (await handleApiResponse(response)) as {
      signedUp: boolean;
    };

    if (signedUp === undefined || signedUp === null) {
      throw new Error("User not found");
    }

    return signedUp;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to check if user exists");
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
