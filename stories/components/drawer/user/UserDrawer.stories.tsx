import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { AccountDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";
import OpenUserDrawerButton from "@/components/drawer/user/OpenDrawerButton";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { mockAccount, mockTQueryAccount } from "@/stories/mocks/account.mocks";
import React from "react";

const queryClient = new QueryClient();

const meta = {
  title: "Component/Drawer/User",
  component: UserDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockTQueryAccount);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    }, []);
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

export const OpenDrawer: Story = {};

export const OpenAccountDialog: Story = {
  render: () => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isAccountOpen: true });
    }, []);
    return (
      <>
        <AccountDialog />
      </>
    );
  },
};

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
