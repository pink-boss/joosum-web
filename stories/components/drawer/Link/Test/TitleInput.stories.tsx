import type { Meta, StoryObj } from "@storybook/react";

import TitleInput from "@/components/drawer/link/TitleInput";
import meta from "../TitleInput.stories";
import { expect, userEvent, within } from "@storybook/test";

const testMeta = {
  ...meta,
  title: "Component/Drawer/TitleInput",
  decorators: [
    (Story) => (
      <form className="flex flex-col gap-2">
        <Story />
        <button type="submit" className="bg-primary-500 text-white outline">
          submit
        </button>
      </form>
    ),
  ],
} satisfies Meta<typeof TitleInput>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestRequired: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvasElement.querySelector("form");
    const button = canvas.getByRole("button");

    await userEvent.click(button);
    expect(form?.checkValidity()).toBe(false);
  },
};

export const TestMaxLength: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("title");

    expect(input).toHaveProperty("maxLength", 60);
  },
};
