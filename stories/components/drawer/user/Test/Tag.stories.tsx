import type { Meta, StoryObj } from "@storybook/react";

import { http, HttpResponse } from "msw";

import {
  DeleteTagConfirmDialog,
  TagSettingDialog,
} from "@/components/dialog/dynamic";

import { mockTags } from "@/stories/mocks/tag.mocks";

import { expect, userEvent, waitFor, within } from "@storybook/test";
import React from "react";
import { verifyTagsAPI } from "@/utils/storybook-test";
import meta from "../Tag.stories";
import { queryClient } from "@/stories/mocks/store.mocks";
import { getTagsQueryKey } from "@/utils/queryKey";

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
          const tags = await request.json();
          queryClient.setQueryData(getTagsQueryKey("created"), tags);
          queryClient.setQueryData(getTagsQueryKey("used"), tags);
          return HttpResponse.json([]);
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
    await verifyTagsAPI(capturedRequest, `/api/settings/tags`, "POST", [
      "블록체인",
    ]);

    // 스페이스바
    await userEvent.type(input, "양자컴퓨터 ");
    await verifyTagsAPI(capturedRequest, `/api/settings/tags`, "POST", [
      "양자컴퓨터",
      "블록체인",
    ]);

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
          const tags = await request.json();
          queryClient.setQueryData(getTagsQueryKey("created"), tags);
          queryClient.setQueryData(getTagsQueryKey("used"), tags);
          return HttpResponse.json([]);
        }),
      ],
    },
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

    await verifyTagsAPI(capturedRequest, `/api/settings/tags`, "POST", [
      "맛집",
      ...mockTags.slice(1),
    ]);
    capturedRequest = null;
    await waitFor(() => {
      expect(capturedRequest).toBeNull();
    });

    // 스페이스바
    const targetForSpacebarKey = await canvas.findByText("맛집");
    await userEvent.click(targetForSpacebarKey.nextElementSibling!);

    moreOption = targetForEnterKey.nextElementSibling! as HTMLElement;
    moreButton = within(moreOption).getByRole("button");
    await userEvent.click(moreButton);

    updateInput = within(moreOption).getByRole("textbox");
    await userEvent.clear(updateInput);
    await userEvent.type(updateInput, "견문{enter}");

    await verifyTagsAPI(capturedRequest, `/api/settings/tags`, "POST", [
      "견문",
      ...mockTags.slice(1),
    ]);
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
          const { tag: target } = await (params as any);
          const index = mockTags.indexOf(target as string);
          const tags = [
            ...mockTags.slice(0, index),
            ...mockTags.slice(index + 1, -1),
          ];

          queryClient.setQueryData(getTagsQueryKey("created"), tags);
          queryClient.setQueryData(getTagsQueryKey("used"), tags);
          return HttpResponse.json([]);
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

    await waitFor(() => {
      expect(capturedRequest).not.toBeNull();

      const url = new URL(capturedRequest!.url);
      expect(url.pathname).toBe(`/api/settings/tags/AI`);
      expect(capturedRequest!.method).toBe("DELETE");
    });

    const tagList = within(canvas.getByTestId("tag-list"));
    await waitFor(() => {
      expect(tagList.queryByText("AI")).not.toBeInTheDocument();
    });
    capturedRequest = null;
  },
};
