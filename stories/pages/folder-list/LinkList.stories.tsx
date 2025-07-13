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
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";
import { queryClient } from "@/stories/mocks/store.mocks";

const Wrapper = ({ defaultEditMode }: { defaultEditMode?: boolean }) => {
  const linkFilter = useFolderLinkFilterStore();
  const linkBook = useLinkBookFromTitle();

  return (
    <LinkList
      defaultEditMode={defaultEditMode}
      linkFilter={linkFilter}
      linkBookId={linkBook?.linkBookId}
    />
  );
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
        http.get("/api/links", () => {
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/link-books?sort=created_at", ({ request }) => {
          return HttpResponse.json({
            linkBooks: mockLinkBooks,
            totalLinkCount: mockLinkBooks.length,
          });
        }),
        http.get("/api/link-books/:linkBookId/links", ({ request, params }) => {
          return HttpResponse.json(
            params.linkBookId
              ? mockLinks.filter(
                  (link) => params.linkBookId === link.linkBookId,
                )
              : mockLinks,
          );
        }),
      ],
    },
  },
  beforeEach: () => {
    useFolderLinkFilterStore.setState(filterDefaultValues);
    useFolderLinkSortStore.setState(sortDefaulValues);
    queryClient.clear();
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
