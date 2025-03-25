import type { Meta, StoryObj } from "@storybook/react";
import Filter from "@/app/link-book/[title]/Filter";

const meta = {
  title: "Page/FolderList/Filter",
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
