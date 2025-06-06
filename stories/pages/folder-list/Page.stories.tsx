import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Page from "@/app/link-book/[title]/page";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";

import { mockLinks } from "../../mocks/link.mocks";
import { mockLinkBooks } from "../../mocks/linkBook.mocks";
import { mockTags } from "../../mocks/tag.mocks";

const meta = {
  title: "Page/FolderList/Page",
  component: Page,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/links", () => {
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/settings/tags", () => HttpResponse.json(mockTags)),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockLinkBooks);
        }),
      ],
    },
  },
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
        http.get("/api/settings/tags", () => HttpResponse.json([])),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockLinkBooks);
        }),
      ],
    },
  },
};
