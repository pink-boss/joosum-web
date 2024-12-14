import type { Meta, StoryObj } from "@storybook/react";
import LinkCard from "@/app/link-book/[title]/LinkCard";
import { mockLink } from "../mocks/link.mocks";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { jest } from "@storybook/jest";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "@/types/link.types";

const queryClient = new QueryClient();

const LinkWithCachedData = () => {
  const { data } = useQuery<Link>({
    queryKey: ["link", "title", mockLink.title],
    enabled: false,
  });
  if (data) return <LinkCard link={data} />;
};

let capturedRequest: Request | null = null;

const meta = {
  title: "Page/FolderList/LinkCard",
  component: LinkWithCachedData,
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
    queryClient.setQueryData(["link", "title", mockLink.title], () => mockLink);
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof LinkWithCachedData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TestLinkClick: Story = {
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
