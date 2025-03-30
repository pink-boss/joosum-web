import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Page from "@/app/search/page";
import { mockLinks } from "@/stories/mocks/link.mocks";
import { mockTags } from "@/stories/mocks/tag.mocks";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";
import Topbar from "@/components/layout/Topbar";
import { mockEmptyRespone, mockRespone } from "@/stories/mocks/linkBook.mocks";

const meta = {
  title: "Page/FolderList/Search/Page",
  component: Page,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/links", () => {
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/tags", () => HttpResponse.json(mockTags)),
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
    useFolderLinkFilterStore.setState(defaultValues);
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
        http.get("/api/tags", () => HttpResponse.json([])),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockEmptyRespone);
        }),
      ],
    },
  },
};
