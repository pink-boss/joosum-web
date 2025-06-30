type SuccessResult<T> = [T, { status: 204 }];

export const isSuccessfullResponse = <T extends object>(
  response: (T | ApiError | { status: number })[],
): response is SuccessResult<T> => response.every((item) => !("error" in item));
