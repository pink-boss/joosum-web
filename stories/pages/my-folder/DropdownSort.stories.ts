import type { Meta, StoryObj } from "@storybook/react";
import DropdownSort from "@/app/my-folder/dropdown/sort";

const meta = {
  title: "Page/My-Folder/Dropdown/Sort",
  component: DropdownSort,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DropdownSort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { selected: "", setSelected: () => {} },
};
