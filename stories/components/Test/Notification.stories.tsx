import type { Meta, StoryObj } from "@storybook/react";

import { expect, waitFor } from "@storybook/test";
import Notification from "@/components/notification/Notification";
import { toast } from "@/components/notification/toast";

import { screen } from "@storybook/test";
import meta, { Success } from "../Notification.stories";

const testMeta = {
  ...meta,
  title: "Component/Notification",
} satisfies Meta<typeof Notification>;

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
