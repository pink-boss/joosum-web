import type { Meta, StoryObj } from "@storybook/react";
import { mockLinks } from "../mocks/link.mocks";
import LinkList from "@/app/link-book/[title]/LinkList";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigationHooks from "next/navigation";
import { jest } from "@storybook/jest";
import { LinkSortState } from "@/store/useLinkSortStore";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";
import { DeleteLinkDialog } from "@/components/dialog/dynamic";

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
        http.delete("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json({ status: 200 });
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
  beforeEach: () => {
    useLinkFilterStore.setState(defaultValues);
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
    await userEvent.click(within(dropdown).getByTestId("open-button"));

    await userEvent.click(within(dropdown).getByText("많이본순"));

    await waitFor(async () => {
      const linkList = canvas.getAllByRole("listitem");
      expect(
        within(linkList[0]).getByText("읽은 횟수 최다"),
      ).toBeInTheDocument();
      expect(
        within(linkList[linkList.length - 1]).getByText("읽은 횟수 최저"),
      ).toBeInTheDocument();
    });
  },
};

export const TestDeleteLinks: Story = {
  args: { defaultEditMode: true },
  decorators: (Story) => {
    return (
      <>
        <Story />
        <div id="modal-root" />
        <DeleteLinkDialog />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxList = canvas.getAllByRole("listitem");

    await userEvent.click(within(checkboxList[0]).getByRole("checkbox"));
    await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));
    await userEvent.click(within(checkboxList[4]).getByRole("checkbox"));

    // 삭제 버튼 클릭
    await userEvent.click(canvas.getByRole("button", { name: "삭제" }));

    // 확인 다이얼로그 확인
    const dialog = within(canvas.getByRole("dialog"));
    await waitFor(async () => {
      await userEvent.click(dialog.getByRole("button", { name: "삭제" }));
    });

    // 삭제 확인
    await waitFor(async () => {
      expect(
        canvas.queryByText(`0/${mockLinks.length - 3}개`),
      ).toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[0].title }),
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[2].title }),
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[4].title }),
      ).not.toBeInTheDocument();
    });
  },
};

// TODO: 폴더 이동
