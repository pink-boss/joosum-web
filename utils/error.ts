export function isApiError(value: unknown): value is ApiError {
  return typeof value === "object" && value !== null && "error" in value;
}

/**
 * API 응답을 처리하는 헬퍼 함수
 * 서버에서 T | ApiError 형태로 응답하는 경우 사용
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  const result = (await response.json()) as T | ApiError;

  if (isApiError(result)) {
    throw new Error(result.error);
  }

  return result;
}

/**
 * fetch를 래핑한 헬퍼 함수
 */
export async function apiCall<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  return handleApiResponse<T>(response);
}
