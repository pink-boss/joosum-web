import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import Page from "@/app/link-book/[title]/page";
import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";

import meta from "../Page.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

const testMeta = {
  ...meta,
  title: "Page/FolderList/Page",
  beforeEach: () => {
    queryClient.clear();
    useFolderLinkFilterStore.setState(defaultValues);
  },
} satisfies Meta<typeof Page>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

// TODO: data fetch loading test

// TODO: data fetch error test

export const TestFilterStatement_Unread: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("radio", { name: "읽지 않음" }));

    await waitFor(() => {
      expect(canvas.queryAllByRole("listitem").length).toBe(1);
      expect(canvas.getByRole("radio")).toBeChecked();
    });
  },
};

export const TestFilterStatement_DatePicker: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    useFolderLinkFilterStore.setState({
      dateRange: [new Date("2024.03.22"), new Date("2024.03.24")],
    });
    await waitFor(() => {
      expect(canvas.queryAllByRole("listitem").length).toBe(2);
      const datePicker = within(canvas.getByTestId("date-picker"));
      expect(datePicker.getByTestId("open-button")).toHaveTextContent(
        `2024. 03. 22 ~ 2024. 03. 24`,
      );
    });
  },
};

export const TestFilterStatement_TagSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tagSelector = canvas.getByTestId("tag-selector");
    const selectBox = tagSelector.firstElementChild;
    expect(selectBox).toBeInTheDocument();
    await userEvent.click(selectBox! as HTMLElement);

    const checkList = within(tagSelector).getByRole("list");
    await userEvent.click(await within(checkList).findByText("여행")!);
    await userEvent.click(await within(checkList).findByText("쇼핑")!);

    await waitFor(() => {
      expect(canvas.getByTestId("link-list").children.length).toBe(21);
      expect(
        within(selectBox as HTMLElement).getByText("#여행"),
      ).toBeInTheDocument();
      expect(
        within(selectBox as HTMLElement).getByText("#쇼핑"),
      ).toBeInTheDocument();
    });
  },
};
