import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { NotificationSettingDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockTQueryAccount } from "@/stories/mocks/account.mocks";
import { mockNotification } from "@/stories/mocks/settings.mocks";
import React from "react";

const queryClient = new QueryClient();
let capturedRequest: {
  notificationSetting?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User/Notification",
  component: NotificationSettingDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("/api/settings/notification", async () => {
          return HttpResponse.json(mockNotification);
        }),
        http.put("/api/settings/notification", async ({ request }) => {
          capturedRequest.notificationSetting = request.clone();

          return HttpResponse.json({
            matchedCount: 0,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedID: "testUpsertedID",
          });
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    }, []);
    return (
      <QueryClientProvider client={queryClient}>
        <div id="modal-root" />
        <Story />
      </QueryClientProvider>
    );
  },
  beforeEach: () => {
    capturedRequest = {};
  },
} satisfies Meta<typeof NotificationSettingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenNotificationSettingDialog: Story = {
  parameters: {},
};

export const TestNotRead: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const readAgree = await canvas.findByTestId("read-agree");

    await userEvent.click(within(readAgree).getByRole("checkbox"));
    await waitFor(function requestReadAgree() {
      if (capturedRequest.notificationSetting) {
        const url = new URL(capturedRequest.notificationSetting.url);
        expect(url.pathname).toBe(`/api/settings/notification`);
        expect(capturedRequest.notificationSetting.method).toBe("PUT");
      } else {
        throw new Error("읽지 않은 링크 요청 없음 에러");
      }
    });
  },
};

export const TestNotClassify: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const classifyAgree = await canvas.findByTestId("classify-agree");

    await userEvent.click(within(classifyAgree).getByRole("checkbox"));
    await waitFor(function requestClassifyAgree() {
      if (capturedRequest.notificationSetting) {
        const url = new URL(capturedRequest.notificationSetting.url);
        expect(url.pathname).toBe(`/api/settings/notification`);
        expect(capturedRequest.notificationSetting.method).toBe("PUT");
      } else {
        throw new Error("분류되지 않은 링크 요청 없음 에러");
      }
    });
  },
};
