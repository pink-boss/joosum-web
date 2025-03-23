import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { mockRespone } from "../../../mocks/linkBook.mocks";
import { mockTags } from "../../../mocks/tag.mocks";

import { useEffect, useState } from "react";
import Tag from "@/components/drawer/link/Tag";

const queryClient = new QueryClient();

function Wrapper({ defaultTags }: { defaultTags: string[] }) {
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => setTags(defaultTags), [defaultTags]);
  return <Tag tags={tags} setTags={(tags: string[]) => setTags(tags)} />;
}

const meta = {
  title: "Component/Drawer/Link/Add Tags",
  component: Wrapper,
  decorators: (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="drawer-root" />
        <div id="modal-root" />

        <Story />
      </QueryClientProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books?sort=created_at", () => {
          return HttpResponse.json(mockRespone);
        }),
        http.get("/api/tags", () => {
          return HttpResponse.json(mockTags);
        }),
      ],
    },
  },
  args: { defaultTags: mockTags },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyTags: Story = {
  tags: [],
};

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.keyboard("web{enter}");
    await waitFor(() => {
      expect(canvas.queryByText("web")).toBeNull();
      expect(canvas.getByText("10/10"));
      expect(canvas.getByRole("alertdialog")).toBeInTheDocument();
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
