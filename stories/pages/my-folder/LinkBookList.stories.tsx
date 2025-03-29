import type { Meta, StoryObj } from "@storybook/react";

import LinkBookList from "@/app/my-folder/LinkBookList";
import { mockRespone } from "@/stories/mocks/linkBook.mocks";

const meta = {
  title: "Page/MyFolder/LinkBookList",
  component: LinkBookList,
  args: mockRespone,
} satisfies Meta<typeof LinkBookList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
