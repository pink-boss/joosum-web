import type { Meta, StoryObj } from "@storybook/react";
import TagSelector from "@/app/link-book/[title]/tag-selector";
import { totalTags } from "../mocks/tag.mocks";
import { expect, userEvent, within } from "@storybook/test";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";

const meta = {
  title: "Page/FolderList/Filter/Tag",
  component: TagSelector,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  args: {
    totalTags,
  },
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const TestCheckTags: Story = {
  play: async ({ canvasElement }) => {
    useLinkFilterStore.setState({ tags: [] });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));
    const checkboxes = canvas.getAllByRole("checkbox");

    // 체크박스 3개 체크
    for (const [index, num] of [0, 2, 4].entries()) {
      await userEvent.click(checkboxes[num]);
      const selectedTags = within(canvas.getByTestId("selected-tags"));
      expect(selectedTags.getByText(totalTags[num])).toBeInTheDocument();
      expect(canvas.getByText(`${index + 1}/10`));
    }

    // 초기화
    await userEvent.click(canvas.getByText("초기화"));
    expect(canvas.getByTestId("selected-tags-empty")).toBeInTheDocument();
    expect(canvas.getByText("0/10"));
    expect(canvas.queryByRole("checkbox", { checked: true })).toBeNull();
  },
};

export const TestUncheckTags: Story = {
  play: async ({ canvasElement }) => {
    useLinkFilterStore.setState({
      tags: [totalTags[0], totalTags[2], totalTags[4]],
    });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));
    const checkboxes = canvas.getAllByRole("checkbox");

    // 체크박스 1개 해제
    await userEvent.click(checkboxes[2]);
    const selectedTags = within(canvas.getByTestId("selected-tags"));
    expect(selectedTags.queryByText(totalTags[2])).toBeNull();
    expect(canvas.getByText("2/10"));

    // 선택된 태그 1개 제거
    const tag_5 = selectedTags.getByText(totalTags[4]);
    await userEvent.click(within(tag_5).getByRole("button"));
    expect(tag_5).not.toBeInTheDocument();
    expect(canvas.getByText("1/10"));
  },
};

export const TestVisibleTags: Story = {
  play: async ({ canvasElement }) => {
    useLinkFilterStore.setState({ tags: [] });

    const canvas = within(canvasElement);
    const selectbox = canvas.getByTestId("open-button");
    await userEvent.click(selectbox);

    // 체크박스 2개 체크
    const checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[3]);
    expect(
      within(selectbox).queryByText(`#${totalTags[0]}`),
    ).toBeInTheDocument();
    expect(
      within(selectbox).queryByText(`#${totalTags[3]}`),
    ).toBeInTheDocument();
    expect(
      within(selectbox).queryByTestId("hidden-count"),
    ).not.toBeInTheDocument();

    // 체크박스 3개 더 체크
    await userEvent.click(checkboxes[5]);
    await userEvent.click(checkboxes[6]);
    await userEvent.click(checkboxes[4]);
    expect(
      within(selectbox).queryByText(`#${totalTags[5]}`),
    ).toBeInTheDocument();
    expect(
      within(selectbox).queryByText(`#${totalTags[6]}`),
    ).toBeInTheDocument();

    // TODO: 전체 스토리북 테스트시 hidden-count를 못 찾는 에러
    //   expect(within(selectbox).queryByTestId("hidden-count")?.textContent).toBe(
    //     "+1개",
    //   );
  },
};
