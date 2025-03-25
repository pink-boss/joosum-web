import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { AccountDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";
import OpenUserDrawerButton from "@/components/drawer/user/OpenDrawerButton";
import React from "react";
import meta from "../UserDrawer.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

const testMeta = {
  ...meta,
  title: "Component/Drawer/User",
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof UserDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestOpenCloseDrawer: Story = {
  decorators: (Story) => {
    return (
      <>
        <OpenUserDrawerButton />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("user-drawer-open"));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

// 내 계정 정보
export const TestOpenMyAccountDialog: Story = {
  render: () => {
    return (
      <>
        <AccountDialog />
        <UserDrawer />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 오픈
    await userEvent.click(await canvas.findByTestId("open-my-account"));

    let dialog: HTMLElement | null = null;
    dialog = await canvas.findByTestId("my-account");

    waitFor(function bindAccountInfo() {
      expect(
        within(dialog).getByText("pinkbossjoosum@gmail.com"),
      ).toBeInTheDocument();

      expect(within(dialog).getByText("1,423개")).toBeInTheDocument();

      expect(within(dialog).getByText("12개")).toBeInTheDocument();
    });

    // 클로즈
    await userEvent.click(within(dialog).getByAltText("close"));
    await waitFor(function closeDialog() {
      expect(canvas.queryByTestId("my-account")).not.toBeInTheDocument();
    });
  },
};
