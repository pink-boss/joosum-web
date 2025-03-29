import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import LinkBookList from "@/app/my-folder/LinkBookList";
import meta from "../LinkBookList.stories";

const testMeta = {
  ...meta,
  title: "Page/MyFolder/LinkBookList",
} satisfies Meta<typeof LinkBookList>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestRenderList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvas.getAllByTestId("folder-book");

    await expect(
      within(list[0]).getByTestId("folder-book-title"),
    ).toHaveProperty("textContent", "전체");

    await expect(
      within(list[1]).getByTestId("folder-book-title"),
    ).toHaveProperty("textContent", "기본");

    await expect(
      within(list[2]).getByTestId("folder-book-title").textContent,
    ).toContain("개발 참고 자료");

    await expect(
      within(list[6]).getByTestId("folder-book-title"),
    ).toHaveProperty("textContent", "여행 계획");
  },
};

export const TestRenderMoreButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvas.getAllByTestId("folder-book");

    await expect(within(list[0]).queryByTestId("link-book-more")).toBeNull(); // 전체

    await expect(within(list[1]).queryByTestId("link-book-more")).toBeNull(); // 기본

    await expect(
      within(list[2]).queryByTestId("link-book-more"),
    ).toBeInTheDocument();
  },
};

// export const TestSortByTitle: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     const sort = within(canvas.getByTestId("link-book-list-sort"));

//     await userEvent.click(sort.getByTestId("open-button"));
//     await userEvent.click(sort.getByTestId("dropdown-제목순"));

//     const list = canvas.getAllByTestId("folder-book");
//     await expect(
//       within(list[3]).getByTestId("folder-book-title"),
//     ).toHaveProperty("textContent", "디자인 영감");
//   },
// };

// export const TestSortByLastSavedAt: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     const sort = within(canvas.getByTestId("link-book-list-sort"));

//     await userEvent.click(sort.getByTestId("open-button"));
//     await userEvent.click(sort.getByTestId("dropdown-업데이트순"));

//     const list = canvas.getAllByTestId("folder-book");
//     await expect(
//       within(list[2]).getByTestId("folder-book-title"),
//     ).toHaveProperty("textContent", "여행 계획");
//   },
// };
