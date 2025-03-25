import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "@/app/link-book/[title]/date-picker";

const meta = {
  title: "Page/FolderList/DatePicker",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
