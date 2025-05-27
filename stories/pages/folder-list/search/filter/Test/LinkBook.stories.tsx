import type { Meta, StoryObj } from "@storybook/react";
import LinkBookFilter from "@/app/search/filter/LinkBook";
import meta from "../LinkBook.stories";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { mockLinkBooks } from "@/stories/mocks/linkBook.mocks";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

const testMeta = {
  ...meta,
  title: "Page/FolderList/Search/Filter/LinkBook",

  decorators: (Story) => {
    const { linkBookId } = useSearchLinkFilterStore();
    return (
      <>
        <Story />
        <div data-testid="result">{linkBookId}</div>
      </>
    );
  },
} satisfies Meta<typeof LinkBookFilter>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestSelectFolder: Story = {
  args: { linkBookList: mockLinkBooks },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const result = canvas.getByTestId("result");

    await step("기본 폴더", async () => {
      await userEvent.click(await canvas.findByText("기본"));

      await waitFor(() => {
        expect(result).toHaveTextContent("lb_000");
      });
    });

    await step("전체", async () => {
      await userEvent.click(await canvas.findByText("전체"));

      await waitFor(() => {
        expect(result).toHaveTextContent("");
      });
    });
  },
};
