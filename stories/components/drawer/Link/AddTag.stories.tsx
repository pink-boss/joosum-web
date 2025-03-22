import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "@storybook/test";
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
  tags: ["autodocs"],
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

// TODO: step assert 써서 테스트 아웃풋 가독성을 높여보자

export const TestRenderTags: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(function assertTagCount() {
      expect(canvas.getByText(`${mockTags.length}/10`)).toBeInTheDocument();
    });

    for (let tag of mockTags) {
      expect(canvas.getByText(tag)).toBeInTheDocument();
    }
  },
};

// export const TestAddTags: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     // 입력창 선택
//     // 입력
//     // 엔터 누르면 저장
//     // 입력
//     // 스페이스 누르면 저장
//     // 입력
//     // 생성버튼 누르면 저장
//     // 입력 확인
//   },
// };

// export const TestDeleteTags: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     // 특정 태그 삭제
//     // 확인
//   },
// };

// export const TestRecentTags: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     // 태그 추가
//     // 최근 태그 목록에 뜨는지 확인
//   },
// };

// TODO: 생성 기능 막고 커밋. 태그 한번 추가하고 난 뒤 ui, 링크 복사 피드백은 어떻게?
// TODO: 기획대로 수정
// export const UpdateTag: Story = {
//   play: async ({ canvasElement }) => {
//     useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

//     const canvas = within(canvasElement);

//     await waitFor(async () => {
//       const selectedTags = within(canvas.getByTestId("selected-tags"));
//       await userEvent.click(selectedTags.getAllByRole("button")[0]);
//     });

//     await waitFor(async () => {
//       await userEvent.click(canvas.getByTestId("edit-tags-button"));
//     });

//     await waitFor(async () => {
//       const tagSelector = within(canvas.getByTestId("tag-selector"));
//       await userEvent.click(tagSelector.getByTestId("open-button"));
//       await userEvent.click(tagSelector.getByText(mockTags[0]));
//     });

//     await waitFor(async () => {
//       await userEvent.click(canvas.getByTestId("edit-tags-button"));
//     });

//     const selectedTags = within(canvas.getByTestId("selected-tags"));
//     expect(selectedTags.getByText(mockLink.tags[1])).toBeInTheDocument();
//     expect(selectedTags.getByText(mockLink.tags[2])).toBeInTheDocument();
//     expect(selectedTags.getByText(mockTags[0])).toBeInTheDocument();
//   },
// };
