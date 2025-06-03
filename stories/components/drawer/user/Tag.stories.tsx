import type { Meta, StoryObj } from "@storybook/react";

import { http, HttpResponse } from "msw";

import { TagSettingDialog } from "@/components/dialog/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { TagCard } from "@/components/dialog/tag/TagSettingDialog";
import React from "react";

const meta = {
  title: "Component/Drawer/User/Tag",
  component: TagSettingDialog,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", async () => {
          return HttpResponse.json(mockTags);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
    return <Story />;
  },
} satisfies Meta<typeof TagSettingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDialogWithEmptyData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", async () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

export const OpenDialogWithMockData: Story = {};

// 태그 관리 (태그 옵션)
export const OpenTagOption: Story = {
  render: () => <TagCard tag={mockTags[0]} />,
};
