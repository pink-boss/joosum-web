import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { TagSettingDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { TagCard } from "@/components/dialog/tag/TagSettingDialog";
import { expect, userEvent, waitFor, within } from "@storybook/test";

const queryClient = new QueryClient();
let capturedRequest: {
  tags?: Request;
} = {};

const meta = {
  title: "Component/Drawer/User/Tag",
  component: UserDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("/api/settings/tags", async () => {
          return HttpResponse.json(mockTags);
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

// 태그 관리 (데이터 x)
export const OpenTagSettingDialogWithEmptyData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tag", async () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  render: () => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },
};

// 태그 관리 (데이터 o)
export const OpenTagSettingDialogWithMockData: Story = {
  render: () => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },
};

// 태그 관리 (태그 옵션)
export const OpenTagOptionOfTagSettingDialog: Story = {
  render: () => {
    return (
      <>
        <TagCard tag={mockTags[0]} />
      </>
    );
  },
};

export const TestQueryTag: Story = {
  decorators: (Story) => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tags = await canvas.findByTestId("tag-list");

    // 첫 번째 태그
    const first = tags.children[0] as HTMLElement;
    expect(within(first).getByText("생산성")).toBeTruthy();

    // 네 번쨰 태그
    const fourth = tags.children[3] as HTMLElement;
    expect(within(fourth).getByText("AI")).toBeTruthy();
  },
};

export const TestInsertTag: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/settings/tags", async ({ request }) => {
          capturedRequest.tags = request.clone();
          const value = await request.json();
          console.log(value);
          return HttpResponse.json([value]);
        }),
      ],
    },
  },
  decorators: (Story) => {
    useOpenDialogStore.setState({ isTagSettingOpen: true });
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 입력창에 태그 이름 입력
    const input = await canvas.findByRole("textbox");

    // 엔터키
    await userEvent.type(input, "블록체인{enter}");
    await waitFor(function requestInsertTagsWithEnterKey() {
      if (capturedRequest.tags) {
        const url = new URL(capturedRequest.tags.url);
        expect(url.pathname).toBe(`/api/settings/tags`);
        expect(capturedRequest.tags.method).toBe("POST");
      } else {
        throw new Error("태그 추가 에러 (enter)");
      }
    });

    // 스페이스바
    await userEvent.type(input, "양자컴퓨터 ");
    await waitFor(function requestInsertTagsWithSpacebarKey() {
      if (capturedRequest.tags) {
        const url = new URL(capturedRequest.tags.url);
        expect(url.pathname).toBe(`/api/settings/tags`);
        expect(capturedRequest.tags.method).toBe("POST");
      } else {
        throw new Error("태그 추가 에러 (spacebar)");
      }
    });

    expect(canvas.getByText("블록체인")).toBeTruthy();
    expect(canvas.getByText("양자컴퓨터")).toBeTruthy();
  },
};

// TODO: 태그 수정
// TODO: 태그 삭제
