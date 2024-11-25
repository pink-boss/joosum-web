import Topbar from "@/components/layout/topbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Component/Layout/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
