"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

import PreviousProviderBubble from "@/components/PreviousProviderBubble";
import { PreviousLoginProvider } from "@/types/auth.types";
import { sanitizeRedirectUrl } from "@/utils/auth/oauth";
import { getClientUri } from "@/utils/envUri";

const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_APPLE_ID;

const AppleOAuthHandler = ({
  previousLoginProvider,
}: {
  previousLoginProvider: PreviousLoginProvider;
}) => {
  const loginWithApple = async (e: React.MouseEvent<HTMLButtonElement>) => {
    sendGTMEvent({
      event: "click.appleLogin_login",
    });
    try {
      const res = await window.AppleID?.auth.signIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const redirectURI = `${getClientUri()}/auth/callback/apple`;
    window.AppleID?.auth.init({
      clientId: APPLE_CLIENT_ID,
      scope: "name email",
      redirectURI: sanitizeRedirectUrl(redirectURI),
      state: "signin",
    });
  }, []);
  return (
    <PreviousProviderBubble
      isPreviousProvider={previousLoginProvider === "apple"}
    >
      <button
        onClick={loginWithApple}
        className="flex h-[56px] items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800 active:bg-black"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white"
        >
          <path d="M17.05 12.536c-.031-3.009 2.458-4.45 2.572-4.519-1.399-2.046-3.578-2.327-4.356-2.361-1.854-.188-3.619 1.092-4.558 1.092-.939 0-2.389-1.065-3.93-1.037-2.023.03-3.885 1.176-4.927 2.988-2.1 3.642-.538 9.037 1.508 11.995 1.001 1.444 2.193 3.067 3.757 3.009 1.508-.061 2.078-.973 3.9-.973 1.823 0 2.334.973 3.93.943 1.623-.029 2.65-1.474 3.642-2.925 1.147-1.677 1.619-3.299 1.647-3.384-.037-.014-3.16-1.212-3.185-4.828zM14.467 6.088c.831-1.008 1.392-2.406 1.24-3.797-1.197.049-2.649.797-3.507 1.805-.771.893-1.445 2.318-1.263 3.686 1.335.104 2.698-.682 3.53-1.694z" />
        </svg>
        <span className="font-medium">Apple ID로 시작하기</span>
      </button>
    </PreviousProviderBubble>
  );
};

export default AppleOAuthHandler;
