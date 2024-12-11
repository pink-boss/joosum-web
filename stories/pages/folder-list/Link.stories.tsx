import type { Meta, StoryObj } from "@storybook/react";
import Link from "@/app/my-folder/[linkBookId]/link";
import { mockLink } from "../mock-up";

const meta = {
  title: "Page/FolderList/Link",
  component: Link,
  args: {
    link: mockLink,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
