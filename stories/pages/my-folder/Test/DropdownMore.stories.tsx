import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import meta, { QueryLinkBookList } from "../DropdownMore.stories";
import { queryClient } from "@/stories/mocks/store.mocks";

const testMeta = {
  ...meta,
  title: "Page/MyFolder/DropdownMore",
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof QueryLinkBookList>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestOpenDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(linkBookMore.getByAltText("more"));

    await expect(linkBookMore.getByText("폴더 수정")).toBeInTheDocument();
    await expect(linkBookMore.getByText("폴더 삭제")).toBeInTheDocument();
  },
};

export const TestpenEditDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(await linkBookMore.findByAltText("more"));
    await userEvent.click(await linkBookMore.findByText("폴더 수정"));

    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeInTheDocument();
      await expect(within(dialog).getByText("폴더 수정")).toBeInTheDocument();
    });
  },
};

export const TestOpenDeleteDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(linkBookMore.getByAltText("more"));
    await userEvent.click(linkBookMore.getByText("폴더 삭제"));

    waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeInTheDocument();
      await expect(
        within(dialog).getByRole("button", { name: "삭제" }),
      ).toBeInTheDocument();
    });
  },
};
