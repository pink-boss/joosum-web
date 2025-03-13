import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { NotificationSettingDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockAccount } from "@/stories/mocks/account.mocks";
import { mockNotification } from "@/stories/mocks/settings.mocks";

const queryClient = new QueryClient();
let capturedRequest: {
  notificationSetting?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User",
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

export const OpenNotificationSettingDialog: Story = {
  render: () => {
    useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    return (
      <>
        <NotificationSettingDialog />
      </>
    );
  },
};

// 알림 설정
export const TestNotificationSetting: Story = {
  decorators: (Story) => {
    useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    return (
      <>
        <NotificationSettingDialog />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/notification", async () => {
          return HttpResponse.json(mockNotification);
        }),
        http.put("/api/settings/notification", async ({ request }) => {
          capturedRequest.notificationSetting = request.clone();
          console.log("request");
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
  beforeEach: () => {
    capturedRequest = {};
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 읽지 않은 링크
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

    // capturedRequest = {};

    // 분류되지 않은 링크
    // const classifyAgree = await canvas.findByTestId("classify-agree");

    // await userEvent.click(within(classifyAgree).getByRole("checkbox"));
    // await waitFor(function requestClassifyAgree() {
    //   if (capturedRequest.notificationSetting) {
    //     const url = new URL(capturedRequest.notificationSetting.url);
    //     expect(url.pathname).toBe(`/api/settings/notification`);
    //     expect(capturedRequest.notificationSetting.method).toBe("PUT");
    //   } else {
    //     throw new Error("분류되지 않은 링크 요청 없음 에러");
    //   }
    // });

    // capturedRequest = {};
  },
};
