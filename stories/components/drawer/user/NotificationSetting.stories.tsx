import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { NotificationSettingDialog } from "@/components/dialog/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockNotificationSetting } from "@/stories/mocks/settings.mocks";
import React from "react";

const meta = {
  title: "Component/Drawer/User/NotificationSetting",
  component: NotificationSettingDialog,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/notification", async () => {
          return HttpResponse.json(mockNotificationSetting);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    }, []);
    return <Story />;
  },
} satisfies Meta<typeof NotificationSettingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenNotificationSettingDialog: Story = {
  parameters: {},
};
