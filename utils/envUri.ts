export const trimTrailingSlash = (uri?: string) => {
  if (!uri) return undefined;
  return uri.endsWith("/") ? uri.slice(0, -1) : uri;
};

export const removePercentChars = (uri?: string) => {
  if (!uri) return "";
  return uri.replace(/%/g, "");
};

export const getClientUri = () => {
  return removePercentChars(
    trimTrailingSlash(process.env.NEXT_PUBLIC_JOOSUM_WEB_URI),
  );
};

export const getServerApiUri = () => {
  return removePercentChars(trimTrailingSlash(process.env.JOOSUM_SERVER_URI));
};
