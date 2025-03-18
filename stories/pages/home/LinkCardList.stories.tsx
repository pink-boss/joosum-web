import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LinkCardList from "@/app/home/LinkCardList";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { mockLinks } from "../../mocks/link.mocks";

const queryClient = new QueryClient();

const meta = {
  title: "Page/Home/LinkCardList",
  component: LinkCardList,
  tags: ["autodocs"],
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof LinkCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: (Story) => {
    queryClient.setQueryData(getLinkListQueryKey(), mockLinks);
    return <Story />;
  },
};

export const Empty: Story = {
  args: { links: [] },
};
