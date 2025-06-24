import type { Meta, StoryObj } from "@storybook/react";

import { expect, waitFor } from "@storybook/test";
import NotificationToast from "@/components/notification/toast/NotificationToast";
import { toast } from "@/components/notification/toast/toast";

import { screen } from "@storybook/test";
import meta, { Success } from "../NotificationToast.stories";

const testMeta = {
  ...meta,
  title: "Component/NotificationToast",
} satisfies Meta<typeof NotificationToast>;

export default testMeta;

export const TestOpenClose: StoryObj = {
  render: () => <></>, // 삭제 확인을 위해 앞의 스토리 기록을 삭제
  play: async () => {
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
