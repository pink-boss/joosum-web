import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "@/components/layout/SearchInput";
import meta from "../SearchInput.stories";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useSearchBarStore } from "@/store/useSearchBarStore";

const testMeta = {
  ...meta,
  title: "Page/FolderList/Search/SearchInput",
  decorators: (Story) => {
    const { title } = useSearchBarStore();
    return (
      <>
        <Story />
        <div data-testid="result">{title}</div>
      </>
    );
  },
} satisfies Meta<typeof SearchInput>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestSearchWithEnterKey: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));
    await userEvent.keyboard("피그마{Enter}");
    await waitFor(() => {
      expect(canvas.getByTestId("result")).toHaveTextContent("피그마");
    });
  },
};

export const TestSearchWithDelay: Story = {
  args: { inputDelay: 100 },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));
    await userEvent.keyboard("피그마");

    expect(canvas.getByTestId("result")).toHaveTextContent("");

    await step("input delay", async () => {
      await new Promise((res) => setTimeout(res, 150));
      await waitFor(() => {
        expect(canvas.getByTestId("result")).toHaveTextContent("피그마");
      });
    });
  },
};
export const TestSearchWithButton: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));
    await userEvent.keyboard("피그마");

    await step("click button", async () => {
      const button = canvas.getByTestId("search-button");
      expect(button).toBeInTheDocument();
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(canvas.getByTestId("result")).toHaveTextContent("피그마");
    });
  },
};
export const TestClear: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/search",
      },
    },
  },
  beforeEach: () => {
    useSearchBarStore.getState().setTitle("피그마");
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId("search-link-input")).toHaveValue("피그마");

    await step("click button", async () => {
      const button = await canvas.findByTestId("clear-button");
      expect(button).toBeInTheDocument();
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(canvas.getByTestId("search-link-input")).toHaveValue("");
    });
  },
};
