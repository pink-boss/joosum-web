import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import LinkCard from "@/app/link-book/[title]/LinkCard";

import { mockLink } from "../../mocks/link.mocks";

const queryClient = new QueryClient();

let capturedRequest: Request | null = null;

const meta = {
  title: "Page/FolderList/LinkCard",
  component: LinkCard,
  tags: ["autodocs"],
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
  decorators: (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
  args: { link: mockLink },
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TestLinkClickCount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const windowSpy = jest.spyOn(window, "open");
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
      expect(windowSpy).toHaveBeenCalledWith(mockLink.url, "_blank");
    });

    windowSpy.mockRestore();
  },
};
