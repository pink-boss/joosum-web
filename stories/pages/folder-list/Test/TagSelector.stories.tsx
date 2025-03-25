import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import TagSelector from "@/app/link-book/[title]/tag-selector";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

import { mockTags } from "../../../mocks/tag.mocks";
import meta from "../TagSelector.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

const testMeta = {
  ...meta,
  title: "Page/FolderList/TagSelector",
  decorators: (Story) => {
    const { tags, setTags } = useLinkFilterStore();
    return <Story args={{ tags, setTags, className: "w-[305px]" }} />;
  },
  beforeEach: () => {
    useLinkFilterStore.setState({ tags: defaultValues.tags });
    queryClient.clear();
  },
} satisfies Meta<typeof TagSelector>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestCheckTags: Story = {
  play: async ({ canvasElement }) => {
    useLinkFilterStore.setState({ tags: [] });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));
    await waitFor(async () => {
      const checkboxes = canvas.getAllByRole("checkbox");

      // 체크박스 3개 체크
      for (const [index, num] of [0, 2, 4].entries()) {
        await userEvent.click(checkboxes[num]);
        const selectedTags = within(canvas.getByTestId("selected-tags"));
        expect(selectedTags.getByText(mockTags[num])).toBeInTheDocument();
        expect(canvas.getByText(`${index + 1}/10`));
      }
    });

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
      tags: [mockTags[0], mockTags[2], mockTags[4]],
    });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));
    const checkboxes = canvas.getAllByRole("checkbox");

    // 체크박스 1개 해제
    await userEvent.click(checkboxes[2]);
    const selectedTags = within(canvas.getByTestId("selected-tags"));
    expect(selectedTags.queryByText(mockTags[2])).toBeNull();
    expect(canvas.getByText("2/10"));

    // 선택된 태그 1개 제거
    const tag_5 = selectedTags.getByText(mockTags[4]);
    await userEvent.click(checkboxes[4]);
    expect(selectedTags.queryByText(mockTags[4])).toBeNull();
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
    await waitFor(() => {
      expect(
        within(selectbox).queryByText(`#${mockTags[0]}`),
      ).toBeInTheDocument();
      expect(
        within(selectbox).queryByText(`#${mockTags[3]}`),
      ).toBeInTheDocument();
      expect(
        within(selectbox).queryByTestId("hidden-count"),
      ).not.toBeInTheDocument();
    });

    // 체크박스 3개 더 체크
    await userEvent.click(checkboxes[5]);
    await userEvent.click(checkboxes[6]);
    await userEvent.click(checkboxes[4]);
    expect(
      within(selectbox).queryByText(`#${mockTags[5]}`),
    ).toBeInTheDocument();
    expect(
      within(selectbox).queryByText(`#${mockTags[6]}`),
    ).toBeInTheDocument();

    await userEvent.click(checkboxes[1]);
    // hidden-count
    await waitFor(async () => {
      expect(canvas.queryByTestId("hidden-count")).toHaveTextContent("+1개");
    });
  },
};
