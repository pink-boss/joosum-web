import type { Meta, StoryObj } from "@storybook/react";
import DropdownFilter from "@/app/my-folder/dropdown/filter";

const meta = {
  title: "Page/My-Folder/Dropdown/Filter",
  component: DropdownFilter,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DropdownFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
