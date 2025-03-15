import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { TagSettingDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockAccount } from "@/stories/mocks/account.mocks";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { TagCard } from "@/components/dialog/tag/TagSettingDialog";

const queryClient = new QueryClient();
let capturedRequest: {
  logout?: Request;
  deleteAccount?: Request;
  notificationSetting?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User/Tag",
  component: UserDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockAccount);
        }),
      ],
    },
  },
  decorators: (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="drawer-root" />
        <div id="modal-root" />
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof UserDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 태그 관리 (데이터 x)
export const OpenTagSettingDialogWithEmptyData: Story = {
  render: () => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },
};

// 태그 관리 (데이터 o)
export const OpenTagSettingDialogWithMockData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tag", async () => {
          return HttpResponse.json(mockTags);
        }),
      ],
    },
  },
  render: () => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },
};

// 태그 관리 (태그 옵션)
export const OpenTagOptionOfTagSettingDialog: Story = {
  render: () => {
    return (
      <>
        <TagCard tag={mockTags[0]} />
      </>
    );
  },
};
