type SuccessResult<T> = [T, { status: 204 }];

export const isSuccessfulResponse = <T extends object>(
  response: ({ status: number } | ApiError | T)[],
): response is SuccessResult<T> => response.every((item) => !('error' in item));
