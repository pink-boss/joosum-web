export const isApiError = (value: unknown): value is ApiError => {
  return typeof value === 'object' && value !== null && 'error' in value;
};

/**
 * API 응답을 처리하는 헬퍼 함수
 * 서버에서 T | ApiError 형태로 응답하는 경우 사용
 */
export const handleApiResponse = async <T>(response: Response): Promise<T | undefined> => {
  const text = await response.text();
  if (!text) {
    // body가 비어있음
    return undefined;
  }
  const result = JSON.parse(text) as ApiError | T;

  if (isApiError(result)) {
    throw new Error(result.error);
  }

  return result;
};

/**
 * fetch를 래핑한 헬퍼 함수
 */
export const apiCall = async <T>(url: string, options?: RequestInit): Promise<T | undefined> => {
  const response = await fetch(url, options);
  return handleApiResponse<T>(response);
};
