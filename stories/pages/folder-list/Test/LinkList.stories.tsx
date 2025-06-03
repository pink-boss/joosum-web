import type { Meta, StoryObj } from "@storybook/react";
import { expect, spyOn, userEvent, waitFor, within } from "@storybook/test";

import { http, HttpResponse } from "msw";

import { ReassignLinkBookDialog } from "@/app/link-book/dialog/dynamic";
import { DeleteLinkDialog } from "@/components/dialog/dynamic";
import {
  defaultValues as filterDefaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";
import {
  defaultValues as sortDefaultValues,
  useFolderLinkSortStore,
} from "@/store/link-sort/useFolderStore";

import { mockLinks, mockRelevanceOptionLinks } from "../../../mocks/link.mocks";
import { mockLinkBooks } from "../../../mocks/linkBook.mocks";
import { queryClient } from "@/stories/mocks/store.mocks";
import meta from "../LinkList.stories";
import React from "react";
import { LinkSortState, searchDefaultValues } from "@/store/link-sort/schema";
import LinkList from "@/app/link-book/[title]/link-list/LinkList";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";

let capturedRequest: Request | null = null;

const testMeta = {
  ...meta,
  title: "Page/FolderList/LinkList",
  parameters: {
    ...meta.parameters,
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
        http.get("/api/link-books?sort=created_at", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json({
            linkBooks: mockLinkBooks,
            totalLinkCount: mockLinkBooks.length,
          });
        }),
        http.delete("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json({ status: 200 });
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
  beforeEach: () => {
    useFolderLinkFilterStore.setState(filterDefaultValues);
    useFolderLinkSortStore.setState(sortDefaultValues);
    queryClient.clear();
    capturedRequest = null;
  },
} satisfies Meta<typeof React.Component>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

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
      for (let checkbox of checkboxList) {
        await expect(checkbox.firstChild).toBeChecked();
      }

      // 모두 해제
      await userEvent.click(
        canvas.getByRole("checkbox", {
          name: "모두 선택",
        }),
      );
      for (let checkbox of checkboxList) {
        await expect(checkbox.firstChild).not.toBeChecked();
      }
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

  await userEvent.click(within(dropdown).getByTestId("open-button"));
  await userEvent.click(
    await within(dropdown.lastElementChild as HTMLElement).findByText(label),
  );

  await waitFor(async () => {
    expect(capturedRequest).not.toBeNull();
    const url = new URL(capturedRequest!.url);
    expect(url.pathname).toBe(
      `/api/link-books/${mockLinkBooks[2].linkBookId}/links`,
    );
    expect(url.searchParams.get("sort")).toBe(sort);
    expect(url.searchParams.get("order")).toBe(orderBy);
  });

  capturedRequest = null;
};

export const TestSortRequestURI_Lastest: Story = {
  beforeEach: () => {
    useFolderLinkSortStore.setState(sortDefaultValues);
    capturedRequest = null;
  },
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
  beforeEach: () => {
    useFolderLinkSortStore.setState(sortDefaultValues);
    capturedRequest = null;
  },
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
  beforeEach: () => {
    useFolderLinkSortStore.setState(sortDefaultValues);
    capturedRequest = null;
  },
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
  parameters: {
    nextjs: {
      navigation: {
        segments: [["title", ""]],
      },
    },
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
    return (
      <>
        <Story />
        <DeleteLinkDialog />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkList = await canvas.findByTestId("link-list");

    const checkboxList = within(linkList).getAllByRole("checkbox");

    await waitFor(async () => {
      expect(checkboxList.length).toBe(4);
    });

    await userEvent.click(checkboxList[0]);
    await userEvent.click(checkboxList[2]);

    await waitFor(async () => {
      expect(checkboxList[0]).toBeChecked();
    });
    await userEvent.click(canvas.getByRole("button", { name: "삭제" }));

    await waitFor(async () => {
      const dialog = within(canvas.queryByRole("dialog")!);
      await userEvent.click(dialog.getByRole("button", { name: "삭제" }));
    });

    const filteredLinkBooks = mockLinks.filter(
      (link) => mockLinkBooks[2].linkBookId === link.linkBookId,
    );
    await waitFor(async () => {
      expect(
        canvas.queryByText(`0/${filteredLinkBooks.length - 2}개`),
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
    invalidateQuerySpy = spyOn(queryClient, "invalidateQueries");
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

    await waitFor(async function Check() {
      const checkboxList = canvas.queryAllByRole("listitem");

      await userEvent.click(within(checkboxList[0]).getByRole("checkbox"));
      await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));

      await userEvent.click(canvas.getByRole("button", { name: "폴더이동" }));
    });

    await waitFor(async function HanldeReassignLinkBooks() {
      const dialog = canvas.queryByRole("dialog");
      expect(dialog).toBeInTheDocument();
      await userEvent.click(within(dialog!).getByTestId("open-button"));
      const linkBook = within(dialog!).queryByText(mockLinkBooks[4].title);
      expect(linkBook).toBeInTheDocument();
      await userEvent.click(linkBook!);
      await userEvent.click(
        within(dialog!).getByRole("button", { name: "이동" }),
      );
    });

    await waitFor(async function VerifyChanges() {
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

const SearchWrapper = () => {
  const linkSort = useSearchLinkSortStore();
  const linkFilter = useSearchLinkFilterStore();
  return (
    <LinkList
      defaultEditMode={false}
      linkSort={linkSort}
      linkFilter={linkFilter}
    />
  );
};
// 제목 필터는 서버라서 테스트 불가
export const TestRelevanceOption: Story = {
  render: () => <SearchWrapper />,
  beforeEach: () => {
    testMeta.beforeEach();
    useSearchLinkFilterStore.setState(filterDefaultValues);
    useSearchLinkSortStore.setState(searchDefaultValues);
    useSearchBarStore.getState().setTitle("공식 문서");
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/search",
      },
    },
    msw: {
      handlers: [
        http.get("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json(mockRelevanceOptionLinks);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      const listElement = await canvas.findByTestId("link-list");
      expect(listElement).toBeInTheDocument();

      const items = within(listElement).getAllByRole("listitem");
      expect(items[0].textContent).toMatch(/공식\s?문서.*피그마/);
      expect(items[1].textContent).toMatch(/공식\s?문서.*스토리북/);
      expect(items[2].textContent).toMatch(/React\s?공식\s?문서\s?\(17\)/);
    });
  },
};
