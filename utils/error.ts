export function isApiError(value: unknown): value is ApiError {
  return typeof value === "object" && value !== null && "error" in value;
}
