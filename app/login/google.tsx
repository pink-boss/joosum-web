"use client";

import { useRouter } from "next/navigation";

import PreviousProviderBubble from "@/components/PreviousProviderBubble";
import { PreviousLoginProvider } from "@/types/auth.types";
import { getClientUri } from "@/utils/envUri";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
const GOOGLE_REDIRECT_URI = `${getClientUri()}/auth/callback/google`;

const GoogleOAuthHandler = ({
  previousLoginProvider,
}: {
  previousLoginProvider: PreviousLoginProvider;
}) => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=openid email profile` +
      `&state=${encodeURIComponent(Math.random().toString(36).substring(2, 15))}`;

    router.push(authUrl);
  };

  return (
    <PreviousProviderBubble
      isPreviousProvider={previousLoginProvider === "google"}
    >
      <button
        onClick={handleGoogleLogin}
        className="flex h-[56px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-black hover:bg-gray-50 active:bg-gray-100"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="font-medium">Google 계정으로 시작하기</span>
      </button>
    </PreviousProviderBubble>
  );
};

export default GoogleOAuthHandler;
