import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { AccountDialog, LogoutDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { mockAccount, mockTQueryAccount } from "@/stories/mocks/account.mocks";
import React from "react";

const queryClient = new QueryClient();
let capturedRequest: {
  logout?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User/Account",
  component: AccountDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="modal-root" />
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof AccountDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenLogoutDialog: Story = {
  render: () => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isLogoutOpen: true });
    }, []);
    return (
      <>
        <LogoutDialog />
      </>
    );
  },
};

// 로그아웃 테스트
export const TestLogout: Story = {
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isUserDrawerOpen: true });
      useOpenDialogStore.setState({ isAccountOpen: true });
    }, []);
    return (
      <>
        <LogoutDialog />
        <Story />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/auth/logout", async ({ request }) => {
          capturedRequest.logout = request.clone();
          return HttpResponse.json({
            matchedCount: 0,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedID: "userId",
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

    const dialog = await canvas.findByTestId("my-account");

    await userEvent.click(
      within(dialog).getByRole("button", { name: "로그아웃" }),
    );
    // 로그아웃 컨펌 다이얼로그

    const confirmDialog = await canvas.findByTestId("logout-confirm");

    // 로그아웃 클릭
    await userEvent.click(
      within(confirmDialog).getByRole("button", { name: "확인" }),
    );
    await waitFor(function requestLogout() {
      if (capturedRequest.logout) {
        const url = new URL(capturedRequest.logout.url);
        expect(url.pathname).toBe(`/api/auth/logout`);
        expect(capturedRequest.logout.method).toBe("POST");
      } else {
        throw new Error("로그아웃 요청 없음 에러");
      }
    });

    capturedRequest = {};
  },
};
