import type { Meta, StoryObj } from "@storybook/react";

import { http, HttpResponse } from "msw";

import {
  DeleteTagConfirmDialog,
  TagSettingDialog,
} from "@/components/dialog/dynamic";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { expect, userEvent, waitFor, within } from "@storybook/test";
import React from "react";
import { verifyTestAPI } from "@/utils/storybook-test";
import meta from "../Tag.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

let capturedRequest: Request | null;

const testMeta = {
  ...meta,
  title: "Component/Drawer/User/Tag",
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof TagSettingDialog>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestQueryTag: Story = {
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
          capturedRequest = request.clone();
          return HttpResponse.json([await request.json()]);
        }),
      ],
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 입력창에 태그 이름 입력
    const input = await canvas.findByRole("textbox");

    // 엔터키
    await userEvent.type(input, "블록체인{enter}");
    await verifyTestAPI(capturedRequest, `/api/settings/tags`, "POST");

    expect(canvas.queryByText("블록체인")).toBeTruthy();
    capturedRequest = null;

    // 스페이스바
    await userEvent.type(input, "양자컴퓨터 ");
    await verifyTestAPI(capturedRequest, `/api/settings/tags`, "POST");

    expect(canvas.queryByText("양자컴퓨터")).toBeTruthy();
    capturedRequest = null;
  },
};

export const TestUpdateTag: Story = {
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        http.post("/api/settings/tags", async ({ request }) => {
          capturedRequest = request.clone();
          return HttpResponse.json([await request.json()]);
        }),
      ],
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tagList = within(await canvas.findByTestId("tag-list"));

    // 엔터키
    const targetForEnterKey = await canvas.findByText("생산성");

    let moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    let moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    let updateInput = within(moreOption).getByRole("textbox");
    await userEvent.clear(updateInput);
    await userEvent.type(updateInput, "맛집{enter}");

    await verifyTestAPI(capturedRequest, `/api/settings/tags`, "POST");

    expect(await tagList.findByText("맛집")).toBeTruthy();
    capturedRequest = null;

    // 스페이스바
    const targetForSpacebarKey = await canvas.findByText("여행");
    await userEvent.click(targetForSpacebarKey.nextElementSibling!);

    moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    updateInput = within(moreOption).getByRole("textbox");
    await userEvent.clear(updateInput);
    await userEvent.type(updateInput, "견문{enter}");

    await verifyTestAPI(capturedRequest, `/api/settings/tags`, "POST");

    expect(await tagList.findByText("견문")).toBeTruthy();
    capturedRequest = null;
  },
};

export const TestDeleteTag: Story = {
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        http.delete("/api/settings/tags/:tag", async ({ request, params }) => {
          capturedRequest = request.clone();
          const { tag: target } = params;
          const index = mockTags.indexOf(target as string);
          const tags = [
            ...mockTags.slice(0, index),
            ...mockTags.slice(index + 1, -1),
          ];

          return HttpResponse.json([tags]);
        }),
      ],
    },
  },
  render: () => (
    <>
      <TagSettingDialog />
      <DeleteTagConfirmDialog />
    </>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const targetForEnterKey = await canvas.findByText("AI");

    let moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    let moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    await waitFor(async () => {
      await userEvent.click(within(moreOption).getByText("태그 삭제"));
      await userEvent.click(
        within(canvas.getByTestId("delete-tag-confirm")).getByRole("button", {
          name: "확인",
        }),
      );
    });

    await verifyTestAPI(capturedRequest, `/api/settings/tags/AI`, "DELETE");

    await waitFor(() => {
      expect(canvas.queryByText("AI")).not.toBeInTheDocument();
    });
    capturedRequest = null;
  },
};
