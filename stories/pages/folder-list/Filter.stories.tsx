import type { Meta, StoryObj } from "@storybook/react";
import Filter from "@/components/link/Filter";
import { defaultValues } from "@/store/link-filter/schema";
import { fn } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { mockTags } from "@/stories/mocks/tag.mocks";

const meta = {
  title: "Page/FolderList/Filter",
  component: Filter,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", () => HttpResponse.json(mockTags)),
      ],
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unread: true,
    dateRange: [new Date(), new Date()],
    tags: ["여행", "패션"],
    setDateRange: fn(),
    setUnread: fn(),
    setTags: fn(),
    defaultValues,
  },
};

export const Empty: Story = {
  args: {
    unread: false,
    dateRange: [],
    tags: [],
    setDateRange: fn(),
    setUnread: fn(),
    setTags: fn(),
    defaultValues,
  },
};
