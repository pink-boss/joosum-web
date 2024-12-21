import { trimTrailingSlash } from "@/utils/envUri";

describe("서버 도메인 환경 변수", () => {
  test("마지막 슬래쉬 제거", () => {
    const invalidUrl = "https://perfect-subtle-jawfish.ngrok-free.app/";
    expect(trimTrailingSlash(invalidUrl)).toBe(
      "https://perfect-subtle-jawfish.ngrok-free.app",
    );

    const validUrl = "https://perfect-subtle-jawfish.ngrok-free.app";
    expect(trimTrailingSlash(validUrl)).toBe(
      "https://perfect-subtle-jawfish.ngrok-free.app",
    );
  });
});
