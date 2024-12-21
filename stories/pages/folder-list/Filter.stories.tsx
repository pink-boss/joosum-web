import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Filter from "@/app/link-book/[title]/Filter";

const queryClient = new QueryClient();

const meta = {
  title: "Page/FolderList/Filter",
  component: Filter,
  tags: ["autodocs"],
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
