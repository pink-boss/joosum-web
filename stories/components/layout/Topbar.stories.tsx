import type { Meta, StoryObj } from "@storybook/react";

import Topbar from "@/components/layout/Topbar";

const meta = {
  title: "Component/Layout/Topbar",
  component: Topbar,
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
