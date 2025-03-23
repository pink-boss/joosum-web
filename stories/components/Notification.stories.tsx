import type { Meta, StoryObj } from "@storybook/react";

import React, { useEffect } from "react";
import { expect, waitFor, within } from "@storybook/test";
import Notification from "@/components/notification/Notification";
import { toast } from "@/components/notification/toast";
import { ToastProvider } from "@/components/notification/ToastProvider";
import { screen } from "@storybook/test";

const meta = {
  title: "Component/Notification",
  component: Notification,
  decorators: (Story) => {
    return (
      <ToastProvider>
        <Story />
      </ToastProvider>
    );
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

const ALL_DAY = 1000 * 60 * 60 * 24;

export const Success: Story = {
  args: {
    message: "링크가 저장되었습니다.",
    status: "success",
    duration: ALL_DAY,
    visible: true,
  },
};

export const Fail: Story = {
  args: {
    message: "링크 저장에 실패했습니다.",
    status: "fail",
    duration: ALL_DAY,
    visible: true,
  },
};

export const Warning: Story = {
  args: {
    message: "더 이상 추가할 수 없습니다.",
    status: "warning",
    duration: ALL_DAY,
    visible: true,
  },
};

function useDelayToast(delay: number) {
  React.useEffect(() => {
    const timer = setTimeout(
      () => toast({ ...Success.args, duration: 3000 }),
      delay,
    );
    return () => clearTimeout(timer);
  }, [delay]);
}

export const MultiToast: StoryObj = {
  decorators: (Story) => {
    useDelayToast(0);
    useDelayToast(600);
    useDelayToast(1200);
    return <Story />;
  },
};

export const TestOpenClose: StoryObj = {
  render: () => <></>, // 삭제 확인을 위해 앞의 스토리 기록을 삭제
  play: async ({ canvasElement }) => {
    toast({ ...Success.args, duration: 500, animationDuration: 10 });

    expect(screen.queryByRole("alertdialog")).toBeNull();

    await waitFor(async function OpenToast() {
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });

    await waitFor(function CloseToastAfterDuration() {
      expect(screen.queryByRole("alertdialog")).toBeNull();
    });
  },
};
