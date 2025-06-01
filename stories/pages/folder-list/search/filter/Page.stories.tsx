import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Page from "@/app/search/page";
import { mockLinks } from "@/stories/mocks/link.mocks";
import { mockTags } from "@/stories/mocks/tag.mocks";
import {
  defaultValues as filterDefaultValues,
  useSearchLinkFilterStore,
} from "@/store/link-filter/useSearchStore";
import {
  defaultValues as sortDefaulValues,
  useSearchLinkSortStore,
} from "@/store/link-sort/useSearchStore";
import Topbar from "@/components/layout/Topbar";
import { mockEmptyRespone, mockRespone } from "@/stories/mocks/linkBook.mocks";
import { useSearchBarStore } from "@/store/useSearchBarStore";

const meta = {
  title: "Page/FolderList/Search/Page",
  component: Page,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/search",
      },
    },
    msw: {
      handlers: [
        http.get("/api/links", () => {
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/settings/tags", () => HttpResponse.json(mockTags)),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockRespone);
        }),
      ],
    },
  },
  decorators: (Story) => (
    <>
      <Topbar />
      <Story />
    </>
  ),
  beforeEach: () => {
    useSearchLinkFilterStore.setState(filterDefaultValues);
    useSearchLinkSortStore.setState(sortDefaulValues);
    useSearchBarStore.setState({ title: "" });
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPage: Story = {};

export const EmptyData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/links", () => {
          return HttpResponse.json([]);
        }),
        http.get("/api/settings/tags", () => HttpResponse.json([])),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockEmptyRespone);
        }),
      ],
    },
  },
};

// TODO: 페이지 마다 데이터 있는 경우, 없는 경우, 로딩 ui 만들기
