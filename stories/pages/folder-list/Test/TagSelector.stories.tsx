import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import TagSelector from "@/app/link-book/[title]/tag-selector";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";

import { mockTags } from "../../../mocks/tag.mocks";
import meta from "../TagSelector.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

const testMeta = {
  ...meta,
  title: "Page/FolderList/TagSelector",
  decorators: (Story) => {
    const { tags, setTags } = useFolderLinkFilterStore();
    return <Story args={{ tags, setTags, className: "w-[305px]" }} />;
  },
  beforeEach: () => {
    useFolderLinkFilterStore.setState({ tags: defaultValues.tags });
    queryClient.clear();
  },
} satisfies Meta<typeof TagSelector>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestCheckTags: Story = {
  play: async ({ canvasElement }) => {
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
  beforeEach: () => {
    useFolderLinkFilterStore.setState({
      tags: [mockTags[0], mockTags[2], mockTags[4]],
    });
    queryClient.clear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));

    const checkList = await canvas.findByRole("list");
    expect(checkList).toBeInTheDocument();
    const checkboxes = checkList!.children;

    // 체크박스 1개 해제
    const checkbox2 = checkboxes[2]?.firstElementChild;
    if (checkbox2) {
      await userEvent.click(checkbox2 as HTMLElement);
      const selectedTags = within(canvas.getByTestId("selected-tags"));
      expect(selectedTags.queryByText(mockTags[2])).toBeNull();
      expect(canvas.getByText("2/10"));
    }

    // 선택된 태그 1개 제거
    const checkbox4 = checkboxes[4]?.firstElementChild;
    if (checkbox4) {
      await userEvent.click(checkbox4 as HTMLElement);
      const selectedTags = within(canvas.getByTestId("selected-tags"));
      expect(selectedTags.queryByText(mockTags[4])).toBeNull();
      expect(canvas.getByText("1/10"));
    }
  },
};

export const TestVisibleTags: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectbox = canvas.getByTestId("open-button");
    await userEvent.click(selectbox);

    const checkList = await canvas.findByRole("list");
    expect(checkList).toBeInTheDocument();
    const checkboxes = checkList!.children;

    // 체크박스 2개 체크
    await waitFor(async () => {
      const checkbox0 = checkboxes[0]?.firstElementChild;
      const checkbox3 = checkboxes[3]?.firstElementChild;
      if (checkbox0 && checkbox3) {
        await userEvent.click(checkbox0 as HTMLElement);
        await userEvent.click(checkbox3 as HTMLElement);
        expect(
          within(selectbox).queryByText(`#${mockTags[0]}`),
        ).toBeInTheDocument();
        expect(
          within(selectbox).queryByText(`#${mockTags[3]}`),
        ).toBeInTheDocument();
        expect(
          within(selectbox).queryByTestId("hidden-count"),
        ).not.toBeInTheDocument();
      }
    });

    // 체크박스 3개 더 체크
    const checkbox5 = checkboxes[5]?.firstElementChild;
    const checkbox6 = checkboxes[6]?.firstElementChild;
    const checkbox4 = checkboxes[4]?.firstElementChild;
    if (checkbox5 && checkbox6 && checkbox4) {
      await userEvent.click(checkbox5 as HTMLElement);
      await userEvent.click(checkbox6 as HTMLElement);
      await userEvent.click(checkbox4 as HTMLElement);
      expect(
        within(selectbox).queryByText(`#${mockTags[5]}`),
      ).toBeInTheDocument();
      expect(
        within(selectbox).queryByText(`#${mockTags[6]}`),
      ).toBeInTheDocument();
    }

    const checkbox1 = checkboxes[1]?.firstElementChild;
    if (checkbox1) {
      await userEvent.click(checkbox1 as HTMLElement);
      // hidden-count
      await waitFor(async () => {
        const hiddenCount = canvas.queryByTestId("hidden-count");
        expect(hiddenCount).toBeInTheDocument();
        expect(hiddenCount).toHaveTextContent("+1개");
      });
    }
  },
};
