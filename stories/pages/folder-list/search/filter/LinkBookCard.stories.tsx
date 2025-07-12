import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/app/search/Filter";
import { fn } from "@storybook/test";

const meta = {
  title: "Page/FolderList/Search/Filter/LinkBook/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectedCard: Story = {
  args: {
    isSelected: true,
    onClick: fn(),
    title: "기본",
  },
};

export const UnSelectedCard: Story = {
  args: {
    isSelected: false,
    onClick: fn(),
    title: "기본",
  },
};
export const LongTitleCard: Story = {
  args: {
    isSelected: false,
    onClick: fn(),
    title: "개발 문서 - 프론트엔드 및 테스트",
  },
};
