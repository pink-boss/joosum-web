import CreateButton from "@/app/my-folder/mutate/button";
import {
  pickBackgroundColors,
  pickIllustrations,
  pickTitleColors,
} from "@/app/my-folder/mutate/data";
import MutateDialog from "@/app/my-folder/mutate/dialog";
import { hexToRgb } from "@/utils/color";
import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within, expect } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ComposeComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateButton />
      <div id="modal-root" />
      <MutateDialog />
    </QueryClientProvider>
  );
}

const meta = {
  title: "Page/MyFolder/Dialog/Mutate",
  component: ComposeComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof ComposeComponent>;

export default meta;
type Story = StoryObj<typeof ComposeComponent>;

export const OpenCloseDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "닫기" }));

    await expect(dialog).not.toBeInTheDocument();
  },
};

export const TypeTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    await userEvent.type(canvas.getByTestId("linkbook-title"), "가나다라마사");

    await expect(canvas.getByText("가나다라마사")).toBeInTheDocument();
  },
};

const colorIndex = 1;

export const PickBackgroundColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    await userEvent.click(canvas.getByText("색상"));
    await userEvent.click(canvas.getByTestId(`backgroundColor-${colorIndex}`));

    const preview = canvas.getByTestId("folder-book");
    await expect(preview).toHaveProperty(
      "style.backgroundColor",
      hexToRgb(pickBackgroundColors[colorIndex]),
    );
  },
};

export const PickTitleColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    await userEvent.click(canvas.getByText("색상"));

    const previewTitle = canvas.getByTestId("folder-book-title");
    await userEvent.click(canvas.getByTestId(`titleColor-${colorIndex}`));
    await expect(previewTitle).toHaveProperty(
      "style.color",
      hexToRgb(pickTitleColors[colorIndex]),
    );
  },
};

export const PickIllustration: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    await userEvent.click(canvas.getByText("일러스트"));
    await userEvent.click(canvas.getByTestId(`illustration-${colorIndex}`));

    const previewImg = within(canvas.getByTestId("folder-book")).getByRole(
      "img",
    );

    await expect(previewImg).toHaveAttribute(
      "src",
      expect.stringContaining(
        `/link-book/${pickIllustrations[colorIndex]}.png`,
      ),
    );
  },
};

// TODO: 폼 데이터 주입 확인
export const RenderFormData: Story = {
  play: async ({ canvasElement }) => {
    // const canvas = within(canvasElement);
    // await userEvent.click(canvas.getByTestId("create-dialog-button"));
    // await userEvent.click(canvas.getByText("일러스트"));
    // await userEvent.click(canvas.getByTestId(`illustration-${colorIndex}`));
    // const previewImg = within(canvas.getByTestId("folder-book")).getByRole(
    //   "img",
    // );
    // await expect(previewImg).toHaveAttribute(
    //   "src",
    //   expect.stringContaining(
    //     `/link-book/${pickIllustrations[colorIndex]}.png`,
    //   ),
    // );
  },
  args: {},
};
