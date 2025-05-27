import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "@/app/link-book/[title]/date-picker";
import { useState } from "react";
import { DateRange } from "@/types/date.types";

const Wrapper = () => {
  const [dateRange, setDateRange] = useState<DateRange>([]);
  return <DatePicker dateRange={dateRange} setDateRange={setDateRange} />;
};

const meta = {
  title: "Page/FolderList/DatePicker",
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
