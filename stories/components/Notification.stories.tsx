import type { Meta, StoryObj } from "@storybook/react";

import { Notification } from "@/components/notification/dynamic";

import React from "react";
import {
  saveLinkFailedProps,
  saveLinkSuccessProps,
} from "@/components/notification/data";
import { expect, waitFor, within } from "@storybook/test";
import NotificationRoot from "@/components/notification/NotificationRoot";

const meta = {
  title: "Component/Notification",
  component: Notification,
  decorators: (Story) => {
    return (
      <>
        <NotificationRoot />
        <Story />
      </>
    );
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { ...saveLinkSuccessProps, duration: 1000 * 60 * 60 * 24 },
};

export const Fail: Story = {
  args: { ...saveLinkFailedProps, duration: 1000 * 60 * 60 * 24 },
};

function DelayedToast({
  delay,
  ...props
}: { delay: number } & React.ComponentProps<typeof Notification>) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <Notification {...props} /> : null;
}

export const MultiToast: Story = {
  args: { ...saveLinkSuccessProps, duration: 1000 * 60 * 60 * 24 },
  render: () => {
    return (
      <>
        <Notification {...saveLinkFailedProps} />
        <DelayedToast delay={600} {...saveLinkSuccessProps} />
        <DelayedToast delay={1200} {...saveLinkSuccessProps} />
      </>
    );
  },
};

export const TestOpenClose: Story = {
  args: { ...saveLinkSuccessProps, duration: 100 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(function OpenToast() {
      expect(canvas.getByRole("alertdialog")).toBeInTheDocument();
    });

    await waitFor(
      function CloseToastAfterDuration() {
        expect(canvas.queryByRole("alertdialog")).toBeNull();
      },
      { timeout: 200 },
    );
  },
};
