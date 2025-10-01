import { expect, waitFor } from '@storybook/test';

export const verifyTagsAPI = async (capturedRequest: null | Request, pathname: string, method: string, body?: any) => {
  const error = new Error(`API 요청 에러: ${pathname}`);
  if (!capturedRequest) {
    throw error;
  }

  await waitFor(async function verifyTagsAPI() {
    const url = new URL(capturedRequest.url);
    expect(url.pathname).toBe(pathname);
    expect(capturedRequest.method).toBe(method);
    expect(await capturedRequest.text()).toEqual(JSON.stringify(body));
  });
};
