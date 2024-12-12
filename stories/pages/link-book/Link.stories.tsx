import type { Meta, StoryObj } from "@storybook/react";
import Link from "@/app/link-book/[linkBookId]/LinkCard";
import { mockLink } from "../mocks/link.mocks";

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
