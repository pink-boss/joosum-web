// URL에서 문제가 될 수 있는 특수문자들과 대체 문자들의 매핑
const URL_SAFE_MAPPING = {
  '/': '__SLASH__',
  '#': '__HASH__',
  '?': '__QUESTION__',
  '&': '__AMP__',
  '%': '__PERCENT__',
  '+': '__PLUS__',
  '=': '__EQUAL__',
  ':': '__COLON__',
  ';': '__SEMICOLON__',
  '<': '__LT__',
  '>': '__GT__',
  '"': '__QUOTE__',
  "'": '__SINGLE_QUOTE__',
  '\\': '__BACKSLASH__',
  '|': '__PIPE__',
  '[': '__LEFT_BRACKET__',
  ']': '__RIGHT_BRACKET__',
  '{': '__LEFT_BRACE__',
  '}': '__RIGHT_BRACE__',
  '^': '__CARET__',
  '`': '__BACKTICK__',
  ' ': '__SPACE__',
} as const;

/**
 * URL 경로에 사용할 수 없는 특수문자들을 안전한 문자열로 변환
 * @param str - 변환할 문자열
 * @returns URL에 안전한 형태로 변환된 문자열
 * @example
 * encodeUrlSafeTitle("React/Vue 비교#개발") // "React__SLASH__Vue__SPACE__비교__HASH__개발"
 */
export const encodeUrlSafeTitle = (str: string): string => {
  if (!str) return str;

  let result = str;

  // 각 특수문자를 대체 문자열로 변환
  Object.entries(URL_SAFE_MAPPING).forEach(([char, replacement]) => {
    const regex = new RegExp(escapeRegExp(char), 'g');
    result = result.replace(regex, replacement);
  });

  return result;
};

/**
 * URL 안전 형태로 변환된 문자열을 원래 형태로 복원
 * @param str - 복원할 문자열
 * @returns 원래 특수문자가 복원된 문자열
 * @example
 * decodeUrlSafeTitle("React__SLASH__Vue__SPACE__비교__HASH__개발") // "React/Vue 비교#개발"
 */
export const decodeUrlSafeTitle = (str: string): string => {
  if (!str) return str;

  let result = str;

  // 각 대체 문자열을 원래 특수문자로 복원
  Object.entries(URL_SAFE_MAPPING).forEach(([char, replacement]) => {
    const regex = new RegExp(escapeRegExp(replacement), 'g');
    result = result.replace(regex, char);
  });

  return result;
};

/**
 * 정규식에서 사용되는 특수문자를 이스케이프
 * @param str - 이스케이프할 문자열
 * @returns 이스케이프된 문자열
 */
const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * 문자열이 URL 안전 형태로 인코딩되었는지 확인
 * @param str - 확인할 문자열
 * @returns 인코딩된 문자열인지 여부
 */
export const isUrlSafeEncoded = (str: string): boolean => {
  if (!str) return false;

  return Object.values(URL_SAFE_MAPPING).some((replacement) => str.includes(replacement));
};

/**
 * 문자열에 URL에서 문제가 될 수 있는 특수문자가 포함되어 있는지 확인
 * @param str - 확인할 문자열
 * @returns 특수문자 포함 여부
 */
export const hasUrlUnsafeChars = (str: string): boolean => {
  if (!str) return false;

  return Object.keys(URL_SAFE_MAPPING).some((char) => str.includes(char));
};

/**
 * 문자열을 URL 경로에 안전한 형태로 변환
 * 모든 특수문자를 안전한 문자열로 치환/복원
 */
export const encodeForUrlPath = (str: string): string => {
  return encodeUrlSafeTitle(str);
};

export const decodeFromUrlPath = (str: string): string => {
  return decodeURIComponent(decodeUrlSafeTitle(str));
};

/**
 * URL에서 도메인만 추출하는 함수
 * @param url - 전체 URL 문자열
 * @returns 도메인 문자열 (프로토콜 제외)
 * @example
 * extractDomain("https://naver.com/page/1") // "naver.com"
 * extractDomain("http://www.google.com/search?q=test") // "www.google.com"
 * extractDomain("https://subdomain.example.com:8080/path") // "subdomain.example.com"
 */
export function extractDomain(url: string): string {
  try {
    // URL 객체를 사용하여 도메인 추출
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch (error) {
    console.error(error);
    // URL이 유효하지 않은 경우, 간단한 정규식으로 처리
    const match = url.match(/^(?:https?:\/\/)?([^\/\?#]+)/);
    return match ? match[1] : url;
  }
}
