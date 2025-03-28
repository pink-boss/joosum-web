import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";

import {
  AccountDialog,
  DeleteAccountDialog,
} from "@/components/dialog/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import React from "react";
import meta from "../DeleteAccount.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

let capturedRequest: {
  deleteAccount?: Request;
} = {};

const testMeta = {
  ...meta,
  title: "Component/Drawer/User/Account",
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof AccountDialog>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestDeleteAccount: Story = {
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isUserDrawerOpen: true });
      useOpenDialogStore.setState({ isAccountOpen: true });
    }, []);
    return (
      <>
        <DeleteAccountDialog />
        <Story />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.delete("/api/auth/me", async ({ request }) => {
          capturedRequest.deleteAccount = request.clone();
          return HttpResponse.json({ message: "success" });
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

    // 회원 탈퇴 창 띄우기 (계정 정보 창 제거)
    await userEvent.click(
      within(dialog).getByRole("button", { name: "회원탈퇴" }),
    );

    let confirmDialog: HTMLElement | null = null;

    // 확인 창 띄우기
    await waitFor(function openDeleteConfirmDialog() {
      confirmDialog = canvas.queryByTestId("delete-account");
      expect(confirmDialog).toBeInTheDocument();
    });

    // 기존 창 제거
    await waitFor(function closeAccountDialog() {
      expect(dialog).not.toBeInTheDocument();
    });

    if (!confirmDialog) throw new Error("삭제 확인 창이 없습니다.");
    const deleteButton = within(confirmDialog).getByRole("button", {
      name: "탈퇴하기",
    });

    // 동의 x -> 탈퇴 x
    const agreementButton = within(confirmDialog).getByRole("radio");
    expect(agreementButton).toBeRequired();

    // 동의 o -> 탈퇴 o
    await userEvent.click(agreementButton);
    await userEvent.click(deleteButton);
    await waitFor(function requestDeleteAccount() {
      if (capturedRequest.deleteAccount) {
        const url = new URL(capturedRequest.deleteAccount.url);
        expect(url.pathname).toBe(`/api/auth/me`);
        expect(capturedRequest.deleteAccount.method).toBe("DELETE");
      } else {
        throw new Error("회원 탈퇴 요청 없음 에러");
      }
    });

    capturedRequest = {};
  },
};
