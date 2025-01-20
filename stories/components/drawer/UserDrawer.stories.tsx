import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { AccountDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";
import OpenUserDrawerButton from "@/components/drawer/user/OpenDrawerButton";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { mockAccount } from "@/stories/mocks/account.mocks";

const queryClient = new QueryClient();
let capturedRequest: {
  logout?: Request;
  withdrawal?: Request;
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
  // decorators: (Story) => {
  //   useOpenDialogStore.setState({ isAccountOpen: true });
  //   return <Story />;
  // },
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

// TODO: 유저 목업 데이터 생성하고 drawer에 렌더링
// TODO: 목업 데이터 기반으로 테스트 코드 확인
// TODO: 테스트 통과되도록 코드 작성
// 내 계정 오픈
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
        http.post("/api/auth/logout", async ({ request }) => {
          capturedRequest.logout = request.clone();
          return HttpResponse.json({
            matchedCount: 0,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedID: "userId",
          });
        }),
        http.delete("/api/me", async ({ request }) => {
          capturedRequest.withdrawal = request.clone();
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

    // 다이얼로그 오픈
    await userEvent.click(
      canvas.getByRole("button", { name: "open-my-account" }),
    );

    let dialog: HTMLElement | null = null;
    await waitFor(() => {
      dialog = canvas.queryByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    if (!dialog) {
      expect("다이얼로그 없음 에러").toBeNull();
      return;
    }

    // 계정 확인
    expect(within(dialog).getByText("~~~~@gmail.com")).toBeInTheDocument();

    // 링크 확인
    expect(within(dialog).getByText("1,423")).toBeInTheDocument();

    // 폴더 확인
    expect(within(dialog).getByText("12")).toBeInTheDocument();

    // 회원탈퇴 요청
    if (capturedRequest.withdrawal) {
      const url = new URL(capturedRequest.withdrawal.url);
      expect(url.pathname).toBe(`/api/auth/me`);
      expect(capturedRequest.withdrawal.method).toBe("DELETE");
    } else {
      expect("회원 탈퇴 요청 없음 에러").toBeNull();
      return;
    }

    // 로그아웃 요청
    if (capturedRequest.logout) {
      const url = new URL(capturedRequest.logout.url);
      expect(url.pathname).toBe(`/api/auth/logout`);
      expect(capturedRequest.logout.method).toBe("POST");
    } else {
      expect("로그아웃 요청 없음 에러").toBeNull();
      return;
    }

    // 다이얼로그 클로즈
    await userEvent.click(within(dialog).getByAltText("close"));
    expect(canvas.queryByRole("dialog")).toBeNull();

    capturedRequest = {};
  },
};

// 로그아웃 테스트

// 회원탈퇴 테스트

// 알림 설정

// 태그 관리

// 개인정보처리방침 오픈
