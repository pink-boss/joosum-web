export const replaceSpacesWithDash = (str: string) => {
  return encodeURI(str).replace(/%20/g, "-");
};

export const replaceDashWithSpaces = (str: string) => {
  return decodeURI(str.replace(/-/g, " "));
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
    // URL이 유효하지 않은 경우, 간단한 정규식으로 처리
    const match = url.match(/^(?:https?:\/\/)?([^\/\?#]+)/);
    return match ? match[1] : url;
  }
}
