import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";

import { NotificationSettingDialog } from "@/components/dialog/dynamic";
import meta from "../Notification.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

let capturedRequest: {
  notificationSetting?: Request;
} = {};

const testMeta = {
  ...meta,
  title: "Component/Drawer/User/Notification",
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
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
  beforeEach: () => {
    capturedRequest = {};
    queryClient.clear();
  },
} satisfies Meta<typeof NotificationSettingDialog>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

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
