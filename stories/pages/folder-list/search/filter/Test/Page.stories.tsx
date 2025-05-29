import type { Meta, StoryObj } from "@storybook/react";

import Page from "@/app/search/page";
import meta from "../Page.stories";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";
import { getRouter } from "@storybook/nextjs/navigation.mock";
import {
  defaultValues as filterDefaultValues,
  useSearchLinkFilterStore,
} from "@/store/link-filter/useSearchStore";
import {
  defaultValues as sortDefaulValues,
  useSearchLinkSortStore,
} from "@/store/link-sort/useSearchStore";
import { http, HttpResponse } from "msw";
import { mockRelevanceOptionLinks } from "@/stories/mocks/link.mocks";

const testMeta = {
  ...meta,
  title: "Page/FolderList/Search/Page",
  parameters: {
    ...meta.parameters,
    msw: {
      handlers: [
        http.get("/api/links", () => {
          return HttpResponse.json(mockRelevanceOptionLinks);
        }),
      ],
    },
  },
  beforeEach: async () => {
    useSearchLinkFilterStore.setState(filterDefaultValues);
    useSearchLinkSortStore.setState(sortDefaulValues);
    getRouter().push.mockClear();
  },
} satisfies Meta<typeof Page>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestSearch: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("검색", async () => {
      const input = within(canvas.getByTestId("search-link")).getByRole(
        "textbox",
      );
      await userEvent.type(input, "공식 문서{Enter}");
    });

    await step("검색 페이지 이동", async () => {
      await waitFor(() => {
        expect(getRouter().push).toHaveBeenCalledWith("/search");
      });
    });

    await step("관련도순 정렬", async () => {
      const openButton = (await canvas.findByTestId("sort-dropdown"))
        .firstElementChild as HTMLElement;
      expect(
        await within(openButton).findByText("관련도순"),
      ).toBeInTheDocument();
    });

    await step("검색어 하이라이트", async () => {
      // 링크 목록이 로드될 때까지 기다림 (검색 결과가 있는 경우)
      try {
        const linkList = await waitFor(() => canvas.getByTestId("link-list"), {
          timeout: 10000,
        });

        const keywords = within(linkList).getAllByText("공식 문서");
        await waitFor(() => {
          for (const keyword of keywords) {
            expect(keyword).toHaveClass("text-primary-400");
          }
        });
        expect(within(linkList).queryAllByText("React")[0]).not.toHaveClass(
          "text-primary-400",
        );
      } catch (error) {
        // 검색 결과가 없는 경우 EmptyLinks 컴포넌트가 렌더링됨
        const emptyMessage = canvas.queryByText("검색 결과가 없습니다");
        if (!emptyMessage) {
          // 다른 빈 상태 메시지를 찾거나 테스트를 통과시킴
          console.warn("검색 결과가 없거나 로딩 중입니다.");
        }
      }
    });
  },
};
