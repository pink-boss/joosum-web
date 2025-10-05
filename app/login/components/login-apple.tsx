'use client';

import { useCallback, useEffect } from 'react';

import { getClientUri } from '@/utils/env-uri';
import { sanitizeRedirectUrl } from '@/utils/oauth';

import { AppleIcon } from '@/assets/icons';

import { PreviousLoginProvider } from '@/types/auth.types';

import LoginTooltip from './login-tooltip';

const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_APPLE_ID;

interface Props {
  previousLoginProvider: PreviousLoginProvider;
}

export default function LoginApple({ previousLoginProvider }: Props) {
  const handleClick = useCallback(async () => {
    try {
      await window.AppleID?.auth.signIn();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const redirectURI = `${getClientUri()}/auth/callback/apple`;
    window.AppleID?.auth.init({
      clientId: APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: sanitizeRedirectUrl(redirectURI),
      state: 'signin',
    });
  }, []);

  return (
    <LoginTooltip isPreviousProvider={previousLoginProvider === 'apple'}>
      <button
        className="flex h-[56px] items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800 active:bg-black"
        data-testid="appleLogin_login"
        type="button"
        onClick={handleClick}
      >
        <AppleIcon height={24} width={24} />
        <span className="font-medium">Apple ID로 시작하기</span>
      </button>
    </LoginTooltip>
  );
}
