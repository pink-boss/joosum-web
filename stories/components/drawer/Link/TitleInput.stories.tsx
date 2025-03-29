import type { Meta, StoryObj } from "@storybook/react";
import * as test from "@storybook/test";

import TitleInput from "@/components/drawer/link/TitleInput";

const meta = {
  title: "Component/Drawer/TitleInput",
  component: TitleInput,
  args: {
    setValue: test.fn(),
  },
} satisfies Meta<typeof TitleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Typed: Story = {
  args: {
    value: "Next JS",
  },
};
