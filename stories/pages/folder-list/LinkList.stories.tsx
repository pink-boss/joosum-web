import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import LinkList from "@/app/link-book/[title]/LinkList";
import {
  defaultValues as filterDefaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";

import { mockLinks } from "../../mocks/link.mocks";
import { mockLinkBooks } from "../../mocks/linkBook.mocks";
import {
  defaultValues as sortDefaulValues,
  useFolderLinkSortStore,
} from "@/store/link-sort/useFolderStore";

const Wrapper = ({ defaultEditMode }: { defaultEditMode?: boolean }) => {
  const linkSort = useFolderLinkSortStore();
  return <LinkList defaultEditMode={defaultEditMode} linkSort={linkSort} />;
};

const meta = {
  title: "Page/FolderList/LinkList",
  component: Wrapper,
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
    useFolderLinkFilterStore.setState(filterDefaultValues);
    useFolderLinkSortStore.setState(sortDefaulValues);
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultEditMode: false },
};

export const EditMode: Story = {
  args: { defaultEditMode: true },
};
