export const sanitizeRedirectUrl = (uri: string) => {
  const replacements = [
    { char: ':', token: 'COLON1234' },
    { char: '/', token: 'SLASH1234' },
    { char: '.', token: 'DOT1234' },
    { char: '-', token: 'DASH1234' },
    { char: '_', token: 'UNDERSCORE1234' },
  ];

  let preserved = uri;
  replacements.forEach(({ char, token }) => {
    preserved = preserved.replace(new RegExp('\\' + char, 'g'), token);
  });

  const cleaned = preserved.replace(/[^a-zA-Z0-9COLONSLASHDOTSHUNDERSCORE]/g, '');

  let result = cleaned;
  replacements.forEach(({ char, token }) => {
    result = result.replace(new RegExp(token, 'g'), char);
  });

  return result;
};
