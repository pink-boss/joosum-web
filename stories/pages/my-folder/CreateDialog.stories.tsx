import CreateButton from "@/app/my-folder/create/button";
import {
  pickBackgroundColors,
  pickIllustrations,
  pickTitleColors,
} from "@/app/my-folder/create/data";
import CreateDialog from "@/app/my-folder/create/dialog";
import { hexToRgb } from "@/utils/color";
import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within, expect } from "@storybook/test";

// TODO: 사이드바와 함께 렌더링 됐을 때, 사이드바는 백드롭에서 제외되어야 함.
function ComposeComonent() {
  return (
    <div>
      <CreateButton />
      <CreateDialog />
    </div>
  );
}

const meta = {
  title: "Page/My-Folder/Dialog/Create",
  component: ComposeComonent,
  tags: ["autodocs"],
} satisfies Meta<typeof ComposeComonent>;

export default meta;
type Story = StoryObj<typeof ComposeComonent>;

export const OpenCloseDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("create-dialog-button"));

    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "닫기" }));

    await expect(dialog).toHaveProperty("open", false);
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
        `/link-book/illustration/${pickIllustrations[colorIndex]}.png`,
      ),
    );
  },
};
