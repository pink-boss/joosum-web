import type { Meta, StoryObj } from "@storybook/react";
import * as test from "@storybook/test";

import LinkInput from "@/components/drawer/link/LinkInput";

const meta = {
  title: "Component/Drawer/LinkInput",
  component: LinkInput,
  args: {
    setFormState: test.fn(),
  },
} satisfies Meta<typeof LinkInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Typed: Story = {
  args: {
    value: "https://nextjs.org/",
  },
};
