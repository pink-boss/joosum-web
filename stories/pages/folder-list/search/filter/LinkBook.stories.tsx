import type { Meta, StoryObj } from "@storybook/react";
import LinkBookFilter from "@/app/search/Filter";
import { mockLinkBooks, mockRespone } from "@/stories/mocks/linkBook.mocks";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { http, HttpResponse } from "msw";

const meta = {
  title: "Page/FolderList/Search/Filter/LinkBook",
  component: LinkBookFilter,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockRespone);
        }),
        http.get("/api/link-books?sort=created_at", ({ request }) => {
          return HttpResponse.json({
            linkBooks: mockLinkBooks,
            totalLinkCount: mockLinkBooks.length,
          });
        }),
      ],
    },
  },
  beforeEach: () => {
    useSearchLinkFilterStore.persist.clearStorage();
  },
} satisfies Meta<typeof LinkBookFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongList: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books", () => {
          return HttpResponse.json({
            linkBooks: [...mockLinkBooks, ...mockLinkBooks].map(
              (_linkBook, index) => ({ ..._linkBook, linkBookId: index }),
            ),
            totalLinkCount: mockLinkBooks.length * 2,
          });
        }),
      ],
    },
  },
};
