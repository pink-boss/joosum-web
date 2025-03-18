import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import {
  DeleteTagConfirmDialog,
  TagSettingDialog,
} from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { TagCard } from "@/components/dialog/tag/TagSettingDialog";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import React from "react";

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
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
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
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
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
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);

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
          return HttpResponse.json([await request.json()]);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
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

    expect(canvas.queryByText("블록체인")).toBeTruthy();

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

    expect(canvas.queryByText("양자컴퓨터")).toBeTruthy();
  },
};

export const TestUpdateTag: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", async () => {
          return HttpResponse.json(mockTags);
        }),
        http.post("/api/settings/tags", async ({ request }) => {
          capturedRequest.tags = request.clone();
          return HttpResponse.json([await request.json()]);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
    return (
      <>
        <TagSettingDialog />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 엔터키
    const targetForEnterKey = await canvas.findByText("생산성");

    let moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    let moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    let updateInput = within(moreOption).getByRole("textbox");
    await userEvent.clear(updateInput);
    await userEvent.type(updateInput, "맛집{enter}");

    await waitFor(function requestUpdateTagsWithEnterKey() {
      if (capturedRequest.tags) {
        const url = new URL(capturedRequest.tags.url);
        expect(url.pathname).toBe(`/api/settings/tags`);
        expect(capturedRequest.tags.method).toBe("POST");
      } else {
        throw new Error("태그 추가 에러 (enter)");
      }
    });

    expect(canvas.getByText("맛집")).toBeTruthy();

    capturedRequest = {};

    // 스페이스바
    const targetForSpacebarKey = await canvas.findByText("여행");
    await userEvent.click(targetForSpacebarKey.nextElementSibling!);

    moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    updateInput = within(moreOption).getByRole("textbox");
    await userEvent.clear(updateInput);
    await userEvent.type(updateInput, "견문{enter}");

    await waitFor(function requestUpdateTagsWithSpacebarKey() {
      if (capturedRequest.tags) {
        const url = new URL(capturedRequest.tags.url);
        expect(url.pathname).toBe(`/api/settings/tags`);
        expect(capturedRequest.tags.method).toBe("POST");
      } else {
        throw new Error("태그 추가 에러 (spacebar)");
      }
    });

    expect(canvas.getByText("견문")).toBeTruthy();

    capturedRequest = {};
  },
};

export const TestDeleteTag: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", async () => {
          return HttpResponse.json(mockTags);
        }),
        http.delete("/api/settings/tags/:tag", async ({ request, params }) => {
          capturedRequest.tags = request.clone();
          const { tag: target } = params;
          console.log(target);
          const index = mockTags.indexOf(target as string);
          const tags = [
            ...mockTags.slice(0, index),
            ...mockTags.slice(index + 1, -1),
          ];
          console.log(tags);
          return HttpResponse.json([tags]);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isTagSettingOpen: true });
    }, []);
    return (
      <>
        <TagSettingDialog />
        <DeleteTagConfirmDialog />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const targetForEnterKey = await canvas.findByText("AI");

    let moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    let moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    await userEvent.click(within(moreOption).getByText("태그 삭제"));
    await userEvent.click(
      within(canvas.getByTestId("delete-tag-confirm")).getByRole("button", {
        name: "확인",
      }),
    );

    await waitFor(function requestDeleteTag() {
      if (capturedRequest.tags) {
        const url = new URL(capturedRequest.tags.url);
        expect(url.pathname).toBe(`/api/settings/tags/AI`);
        expect(capturedRequest.tags.method).toBe("DELETE");
      } else {
        throw new Error("태그 삭제 에러");
      }
    });
    await waitFor(() => {
      expect(canvas.queryByText("AI")).not.toBeInTheDocument();
    });
    capturedRequest = {};
  },
};
