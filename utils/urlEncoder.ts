export const replaceSpacesWithDash = (str: string) => {
  return encodeURI(str).replace(/%20/g, "-");
};

export const replaceDashWithSpaces = (str: string) => {
  return decodeURI(str.replace(/-/g, " "));
};
