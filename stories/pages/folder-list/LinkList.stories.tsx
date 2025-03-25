import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import LinkList from "@/app/link-book/[title]/LinkList";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

import { mockLinks } from "../../mocks/link.mocks";
import { mockLinkBooks } from "../../mocks/linkBook.mocks";

const meta = {
  title: "Page/FolderList/LinkList",
  component: LinkList,
  parameters: {
    nextjs: {
      navigation: {
        segments: [["title", mockLinkBooks[2].title]],
      },
    },
    msw: {
      handlers: [
        http.get("/api/links", ({ request }) => {
          return HttpResponse.json(mockLinks);
        }),
      ],
    },
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
