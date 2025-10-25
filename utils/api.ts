import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { logout } from './auth';
import { trimTrailingSlash } from './env-uri';

interface FetchParams {
  path: string;
  method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
  queryString?: null | string;
  body?: Array<any> | boolean | null | number | Record<string, any> | string;
  Authorization?: string;
}

export const serverApi = async ({ path, method, queryString, body, Authorization }: FetchParams) => {
  const token = (await cookies()).get('accessToken');

  if (!token?.value) {
    return NextResponse.json({ error: '정상적으로 로그인되어 있지 않습니다.' });
  }

  try {
    const requestInit: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authorization ?? `Bearer ${token.value}`,
      },
      method: method ?? 'GET',
    };
    if (body) {
      requestInit.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/${path}${queryString ? `?${queryString}` : ''}`,
      requestInit,
    );

    if (!response.body) {
      return NextResponse.json({ status: response.status });
    }

    const data = await response.json();

    // 특정 에러 메시지시 access token 삭제 (공통 처리)
    if (data?.error === 'failed to find the email that Signed up') {
      await logout();
      return NextResponse.json({ error: '잘못된 요청입니다.' });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ error: '서버 요청 중 오류가 발생했습니다.' }, { status: 500 });
  }
};
