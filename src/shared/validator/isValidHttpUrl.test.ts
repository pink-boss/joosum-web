import isValidHttpUrl from "./isValidHttpUrl";

describe("isValidHttpUrl", () => {
  test.each([["https://example.com", true]])("%s", (url, result) => {
    expect(isValidHttpUrl(url)).toBe(result);
  });
});
