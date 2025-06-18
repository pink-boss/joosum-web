import "@storybook/test";
import * as test from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";

import LinkCard from "@/app/link-book/[title]/link-list/LinkCard";

import { mockLink } from "../../../mocks/link.mocks";
import meta from "../Link.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

let capturedRequest: Request | null = null;

const testMeta = {
  ...meta,
  title: "Page/FolderList/LinkCard",
  parameters: {
    msw: {
      handlers: [
        http.put("/api/links/:linkId/read-count", ({ request }) => {
          capturedRequest = request;
          return new HttpResponse("ok", { status: 204 });
        }),
      ],
    },
  },
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof LinkCard>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestLinkClickCount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const windowSpy = test.spyOn(window, "open");
    windowSpy.mockImplementation(() => null);

    await userEvent.click(canvas.getByText(mockLink.title));

    // 조회수 증가
    await waitFor(async () => {
      if (capturedRequest) {
        const url = new URL(capturedRequest.url);
        expect(url.pathname).toBe(`/api/links/${mockLink.linkId}/read-count`);
        expect(
          canvas.getByText(`${mockLink.readCount + 1}회 읽음`),
        ).toBeInTheDocument();
      }
    });

    // 링크 열기
    await waitFor(async () => {
      console.log("TestLinkClickCount", windowSpy);
      console.log("TestLinkClickCount", mockLink.url);
      expect(windowSpy).toHaveBeenCalledWith(mockLink.url, "_blank");
    });

    windowSpy.mockRestore();
  },
};
