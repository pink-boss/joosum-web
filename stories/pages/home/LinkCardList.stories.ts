import type { Meta, StoryObj } from "@storybook/react";
import { mockLinks } from "../mocks/link.mocks";
import LinkCardList from "@/app/home/LinkCardList";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Page/Home/LinkCardList",
  component: LinkCardList,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: { links: mockLinks },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof LinkCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: { links: mockLinks },
};

export const Empty: Story = {
  args: { links: [] },
};
