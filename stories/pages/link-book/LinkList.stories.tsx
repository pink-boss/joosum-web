import type { Meta, StoryObj } from "@storybook/react";
import { mockLinks } from "../mocks/link.mocks";
import LinkList from "@/app/link-book/[linkBookId]/LinkList";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigationHooks from "next/navigation";
import { jest } from "@storybook/jest";
import { LinkSortState } from "@/store/useLinkSortStore";

const queryClient = new QueryClient();
let capturedRequest: Request | null = null;

const meta = {
  title: "Page/FolderList/LinkList",
  component: LinkList,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
    msw: {
      handlers: [
        http.get("/api/links/:linkBookId", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json(mockLinks);
        }),
      ],
    },
  },
  decorators: (Story) => {
    jest.spyOn(navigationHooks, "useParams").mockReturnValue({
      linkBookId: "testLinkBookId",
    });
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultEditMode: false },
};

export const EditMode: Story = {
  args: { defaultEditMode: true },
};

export const TestCheckStatement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // edit mode 변경
    await userEvent.click(canvas.getByRole("button", { name: "편집" }));

    const checkboxList = canvas.getAllByRole("listitem");

    // 3번 체크 박스 적용 확인
    await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));
    await expect(checkboxList[2].firstChild).toBeChecked();

    // 모두 체크
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "모두 선택",
      }),
    );
    checkboxList.forEach(async (checkbox) => {
      await expect(checkbox.firstChild).toBeChecked();
    });

    // 모두 해제
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "모두 선택",
      }),
    );
    checkboxList.forEach(async (checkbox) => {
      await expect(checkbox.firstChild).not.toBeChecked();
    });
  },
};

type TestRequestURI = Pick<LinkSortState, "sort" | "orderBy"> & {
  label: string;
};

const testRequestURI = async ({
  canvasElement,
  label,
  sort,
  orderBy,
}: TestRequestURI & { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const dropdown = canvas.getByTestId("sort-dropdown");

  await waitFor(async () => {
    await userEvent.click(within(dropdown).getByTestId("open-button"));
    await userEvent.click(within(dropdown).getByText(label));

    if (capturedRequest) {
      const url = new URL(capturedRequest.url);
      expect(url.pathname).toBe("/api/links/testLinkBookId");
      expect(url.searchParams.get("sort")).toBe(sort);
      expect(url.searchParams.get("order")).toBe(orderBy);
    }
  });

  capturedRequest = null;
};

export const TestSortRequestURI_Lastest: Story = {
  play: async ({ canvasElement }) => {
    await testRequestURI({
      canvasElement,
      label: "최신순",
      sort: "created_at",
      orderBy: "asc",
    });
  },
};

export const TestSortRequestURI_Oldest: Story = {
  play: async ({ canvasElement }) => {
    await testRequestURI({
      canvasElement,
      label: "오래된순",
      sort: "created_at",
      orderBy: "desc",
    });
  },
};

export const TestSortRequestURI_Title: Story = {
  play: async ({ canvasElement }) => {
    await testRequestURI({
      canvasElement,
      label: "제목순",
      sort: "title",
      orderBy: "desc",
    });
  },
};

export const TestSortRequestURI_MostViewd: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByTestId("sort-dropdown");

    // server api 지원 x
    await step("많이본순", async () => {
      await userEvent.click(within(dropdown).getByTestId("open-button"));

      await waitFor(async () => {
        await userEvent.click(within(dropdown).getByText("많이본순"));

        const linkList = canvas.getAllByRole("listitem");
        expect(
          within(linkList[0]).getByText("읽은 횟수 최다"),
        ).toBeInTheDocument();
        expect(
          within(linkList[linkList.length - 1]).getByText("읽은 횟수 최저"),
        ).toBeInTheDocument();
      });
    });
  },
};
