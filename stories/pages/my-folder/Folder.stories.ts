import type { Meta, StoryObj } from "@storybook/react";
import Folder from "@/app/my-folder/folder";
import { longTitleLinkBook, shortTitleLinkBook } from "./mock-up";

const meta = {
  title: "Page/My-Folder/Folder",
  component: Folder,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Folder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortTitle: Story = {
  args: { linkBook: shortTitleLinkBook },
};

export const LongTitle: Story = {
  args: { linkBook: longTitleLinkBook },
};
