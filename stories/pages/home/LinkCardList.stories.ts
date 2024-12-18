import type { Meta, StoryObj } from "@storybook/react";
import { mockLinks } from "../mocks/link.mocks";
import LinkCardList from "@/app/home/LinkCardList";

const meta = {
  title: "Page/Home/LinkCardList",
  component: LinkCardList,
  tags: ["autodocs"],
  argTypes: { links: mockLinks },
} satisfies Meta<typeof LinkCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { links: mockLinks },
};

export const Empty: Story = {
  args: { links: [] },
};
