import type { Meta, StoryObj } from "@storybook/react";

import { Notification } from "@/components/notification/dynamic";
import { useOpenNotificationStore } from "@/store/useNotificationStore";
import React from "react";

const meta = {
  title: "Component/Notification",
  component: Notification,
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenNotificationStore.setState({ isNotificationOpen: true });
    }, []);
    return (
      <>
        <div id="notification-root" />
        <Story />
      </>
    );
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "링크가 저장되었습니다.",
    status: "success",
  },
};

export const Fail: Story = {
  args: {
    message: "링크 저장에 실패했습니다.",
    status: "fail",
  },
};
// TODO: Open Close

// TODO: 3초 뒤에 자동으로 사라지기

// TODO: failed

// TODO: 여러개 띄우기?
