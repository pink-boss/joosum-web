import type { Meta, StoryObj } from "@storybook/react";

import LinkInput from "@/components/drawer/LinkInput";
import meta from "../LinkInput.stories";
import { expect, userEvent, within } from "@storybook/test";

const testMeta = {
  ...meta,
  title: "Component/Drawer/LinkInput",
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
} satisfies Meta<typeof LinkInput>;

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

export const TestValidationWithForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("url");
    const form = canvasElement.querySelector("form");
    const button = canvas.getByRole("button");

    await userEvent.type(input, "invalid.org");
    await userEvent.click(button);
    expect(form?.checkValidity()).toBe(false);

    expect(input).toHaveAttribute("type", "url");
  },
};

export const TestValidationWithEnterKey: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("url");
    const form = canvasElement.querySelector("form");

    await userEvent.type(input, "invalid.org{Enter}");
    expect(form?.checkValidity()).toBe(false);
  },
};
