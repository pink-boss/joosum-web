import type { Meta, StoryObj } from "@storybook/react";
import DropdownMore from "@/app/my-folder/dropdown/more";

const meta = {
  title: "Page/My-Folder/Dropdown/More",
  component: DropdownMore,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DropdownMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
