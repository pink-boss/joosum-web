import type { Meta, StoryObj } from "@storybook/react";
import LinkBookFilter from "@/app/search/filter/LinkBook";
import { mockLinkBooks } from "@/stories/mocks/linkBook.mocks";

const meta = {
  title: "Page/FolderList/Search/Filter/LinkBook",
  component: LinkBookFilter,
} satisfies Meta<typeof LinkBookFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    linkBookList: mockLinkBooks,
  },
};

export const LongList: Story = {
  args: {
    linkBookList: [...mockLinkBooks, ...mockLinkBooks],
  },
};
