import { sanitizeRedirectUrl } from "@/utils/auth/oauth";

describe("Oauth redirect url", () => {
  test("dev", () => {
    const invalidUrl =
      "https://perfect-subtle-jawfish.ngrok-free.app/auth/callback/apple";
    expect(sanitizeRedirectUrl(invalidUrl)).toBe(
      "https://perfect-subtle-jawfish.ngrok-free.app/auth/callback/apple",
    );
  });

  test("prod", () => {
    const invalidUrl = "https://app.joosum.com%/auth/callback/apple";
    expect(sanitizeRedirectUrl(invalidUrl)).toBe(
      "https://app.joosum.com/auth/callback/apple",
    );
  });
});
