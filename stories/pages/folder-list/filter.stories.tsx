import type { Meta, StoryObj } from "@storybook/react";
import Filter from "@/app/my-folder/[id]/filter";

const meta = {
  title: "Page/Folder-List/Filter",
  component: Filter,
  tags: ["autodocs"],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// TODO: tags
