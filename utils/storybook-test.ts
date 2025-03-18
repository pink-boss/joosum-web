import { expect, waitFor } from "@storybook/test";

export async function verifyTestAPI(
  capturedRequest: Request | null,
  pathname: string,
  method: string,
) {
  const error = new Error(`API 요청 에러: ${pathname}`);
  if (!capturedRequest) {
    throw error;
  }

  await waitFor(function verifyTestAPI() {
    if (capturedRequest) {
      const url = new URL(capturedRequest.url);
      expect(url.pathname).toBe(pathname);
      expect(capturedRequest.method).toBe(method);
    } else {
      throw error;
    }
  });
}
