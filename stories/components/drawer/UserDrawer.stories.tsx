import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import {
  AccountDialog,
  DeleteAccountDialog,
  NotificationSettingDialog,
} from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";
import OpenUserDrawerButton from "@/components/drawer/user/OpenDrawerButton";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { mockAccount } from "@/stories/mocks/account.mocks";
import { mockNotification } from "@/stories/mocks/settings.mocks";

const queryClient = new QueryClient();
let capturedRequest: {
  logout?: Request;
  deleteAccount?: Request;
  notificationSetting?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User",
  component: UserDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockAccount);
        }),
      ],
    },
  },
  decorators: (Story) => {
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

export const OpenDrawer: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    return <Story />;
  },
};

export const OpenAccountDialog: Story = {
  render: () => {
    useOpenDialogStore.setState({ isAccountOpen: true });
    return (
      <>
        <AccountDialog />
      </>
    );
  },
};

export const TestOpenCloseDrawer: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: false });
    return (
      <>
        <OpenUserDrawerButton />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

// TODO: 목업 데이터 기반으로 테스트 코드 확인
// TODO: 테스트 통과되도록 코드 작성
// TODO: 개발 환경에서도 통과하도록 코드 작성
// 내 계정 정보
export const TestOpenMyAccountDialog: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    return (
      <>
        <AccountDialog />
        <Story />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockAccount);
        }),
      ],
    },
  },
  beforeEach: () => {
    capturedRequest = {};
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 다이얼로그 오픈
    await userEvent.click(await canvas.findByTestId("open-my-account"));

    let dialog: HTMLElement | null = null;

    dialog = await canvas.findByTestId("my-account");

    waitFor(function bindAccountInfo() {
      // 계정 확인
      expect(
        within(dialog).getByText("pinkbossjoosum@gmail.com"),
      ).toBeInTheDocument();

      // 링크 확인
      expect(within(dialog).getByText("1,423개")).toBeInTheDocument();

      // 폴더 확인
      expect(within(dialog).getByText("12개")).toBeInTheDocument();
    });

    // 다이얼로그 클로즈
    await userEvent.click(within(dialog).getByAltText("close"));
    await waitFor(function closeDialog() {
      expect(canvas.queryByTestId("my-account")).not.toBeInTheDocument();
    });

    capturedRequest = {};
  },
};

// 로그아웃 테스트
export const TestLogout: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    useOpenDialogStore.setState({ isAccountOpen: true });
    return (
      <>
        <AccountDialog />
        <Story />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockAccount);
        }),
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

export const OpenDeleteAccountDialog: Story = {
  decorators: (Story) => {
    useOpenDialogStore.setState({ isDeleteAccountOpen: true });
    return (
      <>
        <DeleteAccountDialog />
        <Story />
      </>
    );
  },
};

// 회원탈퇴 테스트
export const TestDeleteAccount: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    useOpenDialogStore.setState({ isAccountOpen: true });
    return (
      <>
        <AccountDialog />
        <DeleteAccountDialog />
        <Story />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockAccount);
        }),
        http.delete("/api/auth/delete", async ({ request }) => {
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
        expect(url.pathname).toBe(`/api/auth/delete`);
        expect(capturedRequest.deleteAccount.method).toBe("DELETE");
      } else {
        throw new Error("회원 탈퇴 요청 없음 에러");
      }
    });

    capturedRequest = {};
  },
};

export const OpenNotificationSettingDialog: Story = {
  render: () => {
    useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    return (
      <>
        <NotificationSettingDialog />
      </>
    );
  },
};

// 알림 설정
export const TestNotificationSetting: Story = {
  decorators: (Story) => {
    useOpenDialogStore.setState({ isNotificationSettingOpen: true });
    return (
      <>
        <NotificationSettingDialog />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/notification", async () => {
          return HttpResponse.json(mockNotification);
        }),
        http.put("/api/settings/notification", async ({ request }) => {
          capturedRequest.notificationSetting = request.clone();
          console.log("request");
          return HttpResponse.json({
            matchedCount: 0,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedID: "testUpsertedID",
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

    // 읽지 않은 링크
    const readAgree = await canvas.findByTestId("read-agree");

    await userEvent.click(within(readAgree).getByRole("checkbox"));
    await waitFor(function requestReadAgree() {
      if (capturedRequest.notificationSetting) {
        const url = new URL(capturedRequest.notificationSetting.url);
        expect(url.pathname).toBe(`/api/settings/notification`);
        expect(capturedRequest.notificationSetting.method).toBe("PUT");
      } else {
        throw new Error("읽지 않은 링크 요청 없음 에러");
      }
    });

    // capturedRequest = {};

    // 분류되지 않은 링크
    // const classifyAgree = await canvas.findByTestId("classify-agree");

    // await userEvent.click(within(classifyAgree).getByRole("checkbox"));
    // await waitFor(function requestClassifyAgree() {
    //   if (capturedRequest.notificationSetting) {
    //     const url = new URL(capturedRequest.notificationSetting.url);
    //     expect(url.pathname).toBe(`/api/settings/notification`);
    //     expect(capturedRequest.notificationSetting.method).toBe("PUT");
    //   } else {
    //     throw new Error("분류되지 않은 링크 요청 없음 에러");
    //   }
    // });

    // capturedRequest = {};
  },
};

// 태그 관리

// 개인정보처리방침 오픈
