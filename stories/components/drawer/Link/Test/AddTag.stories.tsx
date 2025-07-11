import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import meta from "../AddTag.stories";
import { Wrapper } from "../AddFolder.stories";
import { mockTags } from "@/stories/mocks/tag.mocks";
import { ToastProvider } from "@/components/notification/toast/ToastProvider";
import { screen } from "@storybook/test";

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Add Tags",
  decorators: (Story) => {
    return (
      <ToastProvider>
        <Story />
      </ToastProvider>
    );
  },
} satisfies Meta<typeof Wrapper>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestRenderTags: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitFor(function assertTagCount() {
      expect(canvas.getByText(`${mockTags.length}/10`)).toBeInTheDocument();
    });

    await step("태그 렌더링 확인", () => {
      for (let tag of mockTags) {
        expect(canvas.getByText(tag)).toBeInTheDocument();
      }
    });
  },
};

export const TestAddTags: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox") as HTMLInputElement;

    await step("엔터 저장", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("web{enter}");
      expect(input.value).toBeFalsy();
      expect(canvas.getByText("web")).toBeInTheDocument();
    });

    await step("스페이스바 저장", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("ios ");
      expect(input.value).toBeFalsy();
      expect(canvas.getByText("ios")).toBeInTheDocument();
    });

    await step("버튼 저장", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("android");
      await userEvent.click(canvas.getByRole("button", { name: "생성하기" }));
      expect(input.value).toBeFalsy();
      expect(canvas.getByText("android")).toBeInTheDocument();
    });
  },
};

export const TestRemoveTag: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const wrapper = canvas.getByText("인공지능").parentElement;
    expect(wrapper).not.toBeNull();

    const RemoveButton = within(wrapper!).getByRole("button");
    await userEvent.click(RemoveButton);

    expect(canvas.queryByText("인공지능")).toBeNull();
  },
};

export const TestLimit: Story = {
  args: { defaultTags: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("tag-input"));
    await userEvent.keyboard("web{enter}");
    await waitFor(() => {
      expect(canvas.queryByText("web")).toBeNull();
      expect(canvas.getByText("10/10"));
      expect(screen.queryByRole("alertdialog")).toBeInTheDocument();
    });
  },
};

// export const TestRecentTags: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     // 태그 추가
//     // 최근 태그 목록에 뜨는지 확인
//   },
// };
