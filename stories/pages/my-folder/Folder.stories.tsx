import type { Meta, StoryObj } from "@storybook/react";
import Folder from "@/app/my-folder/folder";
import { longTitleLinkBook, shortTitleLinkBook } from "../mocks/linkBook.mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Page/MyFolder/Folder",
  component: Folder,
  tags: ["autodocs"],
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Folder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortTitle: Story = {
  args: { linkBook: shortTitleLinkBook },
};

export const LongTitle: Story = {
  args: { linkBook: longTitleLinkBook },
};
