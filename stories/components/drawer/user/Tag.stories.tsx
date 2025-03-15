import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { TagSettingDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { TagCard } from "@/components/dialog/tag/TagSettingDialog";
import { expect, within } from "@storybook/test";

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
        http.get("/api/settings/tag", async () => {
          return HttpResponse.json(mockTags);
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
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tag", async () => {
          return HttpResponse.json([]);
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

// 태그 관리 (데이터 o)
export const OpenTagSettingDialogWithMockData: Story = {
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

export const TestQueryTagSetting: Story = {
  decorators: (Story) => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },
  parameters: {},

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 읽지 않은 링크
    const tags = await canvas.findByTestId("tag-list");

    // 첫 번째 태그
    const first = tags.children[0] as HTMLElement;
    expect(within(first).getByText("생산성")).toBeTruthy();

    // 네 번쨰 태그
    const fourth = tags.children[3] as HTMLElement;
    expect(within(fourth).getByText("AI")).toBeTruthy();
  },
};

// TODO: 태그 삽입
// TODO: 태그 수정
// TODO: 태그 삭제
