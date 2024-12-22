import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import * as navigationHooks from "next/navigation";

import LinkList from "@/app/link-book/[title]/LinkList";
import { ReassignLinkBookDialog } from "@/app/link-book/dialog/dynamic";
import { DeleteLinkDialog } from "@/components/dialog/dynamic";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";
import { LinkSortState } from "@/store/useLinkSortStore";

import { mockLinks } from "../mocks/link.mocks";
import { mockLinkBooks } from "../mocks/linkBook.mocks";

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
        http.get("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/link-books/:linkBookId/links", ({ request, params }) => {
          capturedRequest = request;
          return HttpResponse.json(
            params.linkBookId
              ? mockLinks.filter(
                  (link) => params.linkBookId === link.linkBookId,
                )
              : mockLinks,
          );
        }),
        http.delete("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json({ status: 200 });
        }),
        http.get("/api/link-books?sort=created_at", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json({
            linkBooks: mockLinkBooks,
            totalLinkCount: mockLinkBooks.length,
          });
        }),
        http.put(
          "/api/links/:linkIds/link-book-id/:linkBookId",
          ({ request }) => {
            capturedRequest = request;
            return HttpResponse.json({ status: 204 });
          },
        ),
      ],
    },
  },
  decorators: (Story) => {
    jest.spyOn(navigationHooks, "useParams").mockReturnValue({
      title: mockLinkBooks[2].title,
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

    await waitFor(async () => {
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
      expect(url.pathname).toBe(
        `/api/link-books/${mockLinkBooks[2].linkBookId}/links`,
      );
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
      orderBy: "desc",
    });
  },
};

export const TestSortRequestURI_Oldest: Story = {
  play: async ({ canvasElement }) => {
    await testRequestURI({
      canvasElement,
      label: "오래된순",
      sort: "created_at",
      orderBy: "asc",
    });
  },
};

export const TestSortRequestURI_Title: Story = {
  play: async ({ canvasElement }) => {
    await testRequestURI({
      canvasElement,
      label: "제목순",
      sort: "title",
      orderBy: "asc",
    });
  },
};

export const TestSortRequestURI_MostViewd: Story = {
  decorators: (Story) => {
    jest.spyOn(navigationHooks, "useParams").mockReturnValue({ title: "" });
    return <Story />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByTestId("sort-dropdown");

    // server api 지원 x
    await waitFor(async () => {
      await userEvent.click(within(dropdown).getByTestId("open-button"));

      await userEvent.click(within(dropdown).getByText("많이본순"));
    });

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
    jest
      .spyOn(navigationHooks, "useParams")
      .mockReturnValue({ title: mockLinkBooks[0].title });
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

    waitFor(async () => {
      const checkboxList = canvas.queryAllByRole("listitem");

      await userEvent.click(within(checkboxList[0]).getByRole("checkbox"));
      await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));

      await userEvent.click(canvas.getByRole("button", { name: "삭제" }));

      const dialog = within(canvas.getByRole("dialog"));
      await userEvent.click(dialog.getByRole("button", { name: "삭제" }));
    });

    await waitFor(async () => {
      const filteredLinkBooks = mockLinks.filter(
        (link) => mockLinkBooks[2].linkBookId === link.linkBookId,
      );
      expect(
        canvas.getByText(`0/${filteredLinkBooks.length - 2}개`),
      ).toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[0].title }),
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[2].title }),
      ).not.toBeInTheDocument();
    });
  },
};

let invalidateQuerySpy: any;

export const TestReassignLinkBook: Story = {
  args: { defaultEditMode: true },
  decorators: (Story) => {
    invalidateQuerySpy = jest.spyOn(queryClient, "invalidateQueries");
    return (
      <>
        <Story />
        <div id="modal-root" />
        <ReassignLinkBookDialog />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxList = canvas.getAllByRole("listitem");

    await userEvent.click(within(checkboxList[0]).getByRole("checkbox"));
    await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));

    await userEvent.click(canvas.getByRole("button", { name: "폴더이동" }));

    const dialog = within(canvas.getByRole("dialog"));
    await waitFor(async () => {
      await userEvent.click(dialog.getByTestId("open-button"));
      await userEvent.click(
        dialog.getByRole("button", { name: mockLinkBooks[4].title }),
      );
      await userEvent.click(dialog.getByRole("button", { name: "이동" }));
    });

    await waitFor(async () => {
      const filteredLinkBooks = mockLinks.filter(
        (link) => mockLinkBooks[2].linkBookId === link.linkBookId,
      );
      expect(
        canvas.getByText(`0/${filteredLinkBooks.length - 2}개`),
      ).toBeInTheDocument();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[0].title }),
      ).toBeNull();
      expect(
        canvas.queryByRole("checkbox", { name: mockLinks[2].title }),
      ).toBeNull();
    });

    await waitFor(async () => {
      expect(invalidateQuerySpy).toHaveBeenCalled();
    });
  },
};
