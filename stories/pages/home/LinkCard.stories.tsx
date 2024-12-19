import LinkCard from "@/app/home/LinkCard";
import type { Meta, StoryObj } from "@storybook/react";
import { mockLink } from "../mocks/link.mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Page/Home/LinkCard",
  component: LinkCard,
  tags: ["autodocs"],
  args: { link: mockLink },
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
