export const trimTrailingSlash = (uri?: string) => {
  if (!uri) return undefined;
  return uri.endsWith("/") ? uri.slice(0, -1) : uri;
};
