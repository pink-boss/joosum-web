'use client';

import { useRouter } from 'next/navigation';

import { useCallback, } from 'react';

import { getClientUri } from '@/utils/env-uri';

import { GoogleIcon } from '@/assets/icons';

import { PreviousLoginProvider } from '@/types/auth.types';

import LoginTooltip from './login-tooltip';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;

const GOOGLE_REDIRECT_URI = `${getClientUri()}/auth/callback/google`;

interface Props {
  previousLoginProvider: PreviousLoginProvider;
}

export default function LoginGoogle({ previousLoginProvider }: Props) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=openid email profile` +
      `&state=${encodeURIComponent(Math.random().toString(36).substring(2, 15))}`;

    router.push(authUrl);
  }, [router]);

  return (
    <LoginTooltip isPreviousProvider={previousLoginProvider === 'google'}>
      <button
        className="flex h-14 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3.75"
        data-testid="googleLogin_login"
        type="button"
        onClick={handleClick}
      >
        <GoogleIcon aria-hidden="true" className="size-6" />
        <span className="text-18-26 font-semibold tracking-[-0.2px] text-black/[54%]">Google 계정으로 시작하기</span>
      </button>
    </LoginTooltip>
  );
}
